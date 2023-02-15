export interface Videos {
    _id: string,
    vidId: string,
    title: string,
    description:string,
    author:string,
    location:string,
    date: string,
    likes : string,
    dislikes: string,
    thumbLocation: string,
    comments: [],
    _v: string
}

export interface Video {
    _id: string,
    vidId: string,
    title: string,
    author: string,
    description:string,
    location:string,
    date: string,
    likes : string,
    dislikes: string,
    thumbLocation: string,
    comments: [],
    _v: string
}

export interface Comments {
    author: string,
    text: string,
    date: string,    
}

export interface Res{
    status:number,
    text: string
}