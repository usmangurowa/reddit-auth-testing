import React from "react";
import Link from "next/link";

const Navbar = (props) => {
    return <div>
        <nav>
            <ul className="navbar">
                <li>
                    <Link href={'/'}>
                        <a>
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={'/profile'}>
                        <a>
                            Profile
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={'/signin'}>
                        <a>
                            Sign In
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>;
};

export default Navbar;
