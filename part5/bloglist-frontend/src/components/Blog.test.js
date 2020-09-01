import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const likeBlog = jest.fn();
  const removeBlog = jest.fn();
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
    component = render(
      <Blog blog={blog} user={user} handleBlogLike={likeBlog} handleBlogRemove={removeBlog} />
    );
  });

  test("renders author and title", () => {
    expect(component.container).toHaveTextContent("Mortens testebok");
    expect(component.container).toHaveTextContent("Morten Sund");
  });
  test("does not display url and title", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
  test("url and likes are displayed after expanding", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
  test("double-click like gives two likes", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeBlog.mock.calls).toHaveLength(2)
  });
});
