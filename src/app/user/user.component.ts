import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Res } from '../interfaces';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


var $: any;

@Component({
  selector: 'app-user',
  // standalone:true,
  // imports: [NgbCollapseModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService, private router: Router) { }
  /**
   * variables to show visibility of divs
   */
  signupForm: boolean = false;
  loginForm: boolean = true;

  /**fields required for user sign up form */
  signUser = { username: '', email: '', password1: '', password2: '' }
  userSignupForm !: FormGroup;

  /**fields required for user login form */
  loginUser = { email: '', password: '' }
  userLoginForm !: FormGroup;

  showSignupForm() {
    if (this.signupForm == false && this.loginForm == true) {
      this.signupForm = true;
      this.loginForm = false;
    } else {
      this.signupForm = false;
      this.loginForm = true;
    }
  }

  showLoginForm() {
    if (this.loginForm == false && this.signupForm == true) {
      this.loginForm = true;
      this.signupForm = false;
    } else {
      this.loginForm = false;
      this.signupForm = true;
    }
  }

  ngOnInit(): void {
    this.userSignupForm = new FormGroup({
      username: new FormControl(this.signUser.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(this.signUser.email, [
        Validators.required,
        Validators.email
      ]),
      password1: new FormControl(this.signUser.password1, [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl(this.signUser.password2, [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.userLoginForm = new FormGroup({
      email: new FormControl(this.loginUser.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.loginUser.password, [
        Validators.required,
      ])
    });
  }
  res: Res | undefined

  getSignupFormData(): any {
    return this.userSignupForm.value

  }

  getLoginFormData(): any {
    return this.userLoginForm.value
  }

  submitSignupForm(): any {
    console.log('valid?', this.getSignupFormData())
    const form = new FormData()
    form.append('username', this.getSignupFormData().username)
    // let email = this.getFormData().email.toLowerCase()
    form.append('email', this.getSignupFormData().email.toLowerCase())
    //form.append('email', email)
    const password1 = this.getSignupFormData().password1
    const password2 = this.getSignupFormData().password2
    if (password1 === password2) {
      form.append('password', this.getSignupFormData().password1)
      this.userService.signUp(form).subscribe(resp => {
        this.res = resp.body;
        console.log(this.res);
        if (this.res.status == 400) {
          alert("user with this email already exists")
        }
        else {
          console.log(this.res)
          alert(this.res.text)
        }
      })
    }
    // this.userService.signUp(form).subscribe(resp=>{console.log(resp.headers); console.log(resp.body)})
  }


  submitLoginForm(): any {
    const form = new FormData()
    let email = this.getLoginFormData().email;
    let password = this.getLoginFormData().password;
    console.log(email, password)
    form.append('email', this.getLoginFormData().email)
    form.append('password', this.getLoginFormData().password)
    console.log(form)
    // this.userService.login(form).subscribe(resp => {
    this.authService.login(form).subscribe(resp => {
      this.res = resp.body;
      console.log(this.res);
      this.authService.setSession(this.res)
      if (this.res.status == 200) {
        console.log('user logged in ')
        this.router.navigate(['/user/home'])
        alert('you are logged in')
      }
      else {
        console.log(this.res)
        alert('invalid credentials')
      }
    })
  }

  logout(): any {
    const form = new FormData()
    // this.userService.logO().subscribe(resp => {
    //   this.res = resp.body;
    //   console.log(this.res)
    // });
    this.authService.logout();
  }

}
