import React, { Component } from "react";
import { fetchMainPosts } from "../api/api";
import { ThemeConsumer } from "../context/theme";
import Loading from "./Loading";
import Post from "./Post";

function StoryGrid({ stories }) {
  return (
    <ul className="post space-around">
      {stories.map((story, index) => {
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
        } = story;

        return (
          <li key={index}>
            <Post story={story} />
          </li>
        );
      })}
    </ul>
  );
}

export default class Feed extends Component {
  state = {
    posts: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.updateFeed();
  }

  componentDidUpdate(prev) {
    if (prev.selectedFeed !== this.props.selectedFeed) {
      this.updateFeed();
    }
  }

  updateFeed () {
    this.setState({
      posts: null,
      error: null,
      loading: true
    })

    fetchMainPosts(this.props.selectedFeed)
      .then((posts) => this.setState({
        posts,
        loading: false,
        error: null
      }))
      .catch(({ message }) => this.setState({
        error: message,
        loading: false
      }))
  }

  render() {
    const { posts, error, loading } = this.state;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className={`bg-${theme}`}>
            {loading && <Loading />}
            {error && <p className='error'>{error}</p>}
            {posts && (
              <StoryGrid stories={posts} />
            )}
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
