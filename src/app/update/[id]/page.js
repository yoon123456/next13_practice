"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Update = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const option = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, option)
          .then((res) => res.json())
          .then((result) => {
            router.push(`/read/${result.id}`);
            router.refresh();
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
};

export default Update;
