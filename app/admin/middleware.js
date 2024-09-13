import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    console.log(pathname,"sdsadsad")
    return NextResponse.next();
}
