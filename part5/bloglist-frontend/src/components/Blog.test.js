import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let blog;
  let user;

  beforeEach(() => {
    user = {
      username: "mrtnsund",
    };
    blog = {
      title: "Mortens testebok",
      author: "Morten Sund",
      url: "www.vvv.no",
      likes: 0,
      user,
    };
    component = render(<Blog blog={blog} user={user} />);
  });

  test("renders author and title", () => {
    expect(component.container).toHaveTextContent("Mortens testebok");
    expect(component.container).toHaveTextContent("Morten Sund");
  });
  test("does not display url and title", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  })
});
