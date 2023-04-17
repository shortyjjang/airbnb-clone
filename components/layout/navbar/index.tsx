//'use client';

import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";

export default function Navbar() {
  return (
    <div className="sticky w-full z-10 shadow-sm">
      <div
        className="py-4 border-b-[1px] "
      >
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
