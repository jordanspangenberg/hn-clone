import React from "react";
import { ThemeConsumer } from "../context/theme";

export default function Post(object) {
  const {
    by,
    descendants,
    id,
    kids,
    score,
    time,
    title,
    type,
    url
  } = object.story;

  const dateTime = new Date(time*1000).toLocaleString().replace(/:\d{2}\s/,' ')
  console.log(dateTime)
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`post bg-${theme}`}>
          <a className="link" href={url}>
            {title}
          </a>
          <div className={`meta-info-${theme}`}>
          <span>
              by&nbsp;
              <a href=''>{by}</a>
          </span>
          <span>
               on {dateTime} 
          </span>
          <span>
               with <a href=''>{descendants}</a> comments 
          </span>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}
