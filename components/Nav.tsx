'use client'

import Link from "next/link";
import Image from "next/image";
import  { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers/index";

export default function Nav() {
   const { data: session } = useSession();

   const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null);
   const [toggleDropdown, setToggleDropdown] = useState(false);

   useEffect(() => {
      const setProvidersList = async () => {
         try {
            const response = await getProviders();
            setProviders(response);
         } catch (error) {
            console.error("Error fetching providers:", error);
         }
      }

      setProvidersList();
   }, [])

   return (
      <nav className="flex-between w-full mb-16 p-3">
         <Link href="/" className="flex gap-2 flex-center">
            <Image
               alt="Promptopia Logo"
               width={30}
               height={30}
               src="/assets/images/logo.svg"
               className="object-contain" />

            <p className="logo_text">
               Promptopia
            </p>
         </Link>

         {/* Desktop navigation */}
         <div className="sm:flex hidden">
            { session?.user ? (
                  <div className="flex gap-3 md:gap-5">
                     <Link
                        href="/create-prompt"
                        className="black_btn">
                           Create Post
                     </Link>

                     <button
                        type="button"
                        onClick={() => signOut()}
                        className="outline_btn">
                           Sign Out
                     </button>

                     <Link href={"/profile"} className="flex gap-2 items-center">
                        <Image
                           src={session.user.image || "/assets/images/logo.svg"}
                           width={37}
                           height={37}
                           className="rounded-full"
                           alt="profile"
                        />
                        {session.user?.name}
                     </Link>
                  </div>
               ) : (
                  <>
                     { providers && Object.values(providers).map(provider => (
                        <button
                           type="button"
                           key={provider.name}
                           className="black_btn"
                           onClick={() => signIn(provider.id)}
                           >
                              Sign in with {provider.name}
                        </button>
                     )) }
                  </>
               )
            }
         </div>

         {/* Mobile navigation */}
         <div className="sm:hidden flex relative">
            { session?.user ? (
                  <div className="flex">
                     <Image
                        src={session.user.image || "/assets/images/logo.svg"}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                     />

                     { toggleDropdown && (
                        <div className="dropdown">
                           <Link
                              href={"/profile"}
                              className="dropdown_link"
                              onClick={() => setToggleDropdown(false)}
                              >
                                 My Profile
                           </Link>
                           <Link
                              href={"/create-prompt"}
                              className="dropdown_link"
                              onClick={() => setToggleDropdown(false)}
                              >
                                 Create Prompt
                           </Link>
                           <button
                              type="button"
                              onClick={() => {
                                 setToggleDropdown(false)
                                 signOut()
                              }}
                              className="mt-5 w-full black_btn"
                              >
                                 Sign Out
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <>
                     { providers && Object.values(providers).map(provider => (
                        <button
                           type="button"
                           key={provider.name}
                           className="black_btn"
                           onClick={() => signIn(provider.id)}
                           >
                              Sign in with {provider.name}
                        </button>
                     )) }
                  </>
               )
            }
         </div>
      </nav>
   )
}
