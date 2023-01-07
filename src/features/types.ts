export interface File extends Blob {
  readonly lastModified: number
  readonly name: string
}

export interface PROPS_AUTHEN {
  email: string
  password: string
}

export interface PROPS_PROFILE {
  id: string
  nickName: string
  img: File | null
}

export interface PROPS_NICKNAME {
  nickName: string
}

export interface PROPS_NEWPOST {
  title: string
  imb: File | null
}

export interface PROPS_LIKED {
  id: string
  title: string
  current: string[]
  new: string
}

export interface PROPS_COMMENT {
  text: string
  post: string
}

export interface PROPS_POST {
  postId: string
  loginId: string
  userPost: string
  title: string
  imageUrl: string
  liked: string[]
}
