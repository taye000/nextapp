import Link from "next/link";

export default function Signin() {
    return (
        <>
        <Link href={"/signup"}>Signup</Link>
        <Link href={"/forgotPassword"}>Forgot Password</Link>
        </>
    )
}