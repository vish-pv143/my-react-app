import React, { Component } from "react";

class UserLookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      user: null,
      loading: false,
      error: "",
      notFound: false,
    };
  }

  fetchUser = () => {
    const { userId } = this.state;
    if (!userId) return;

    this.setState({ loading: true, user: null, error: "", notFound: false });

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.id) {
          this.setState({ notFound: true, loading: false });
        } else {
          this.setState({ user: data, loading: false });
        }
      })
      .catch(() => {
        this.setState({ error: "Network error. Try again.", loading: false });
      });
  };

  render() {
    const { userId, user, loading, error, notFound } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Lookup User by ID (1 - 10)</h2>

        <input
          type="number"
          value={userId}
          placeholder="Enter User ID"
          onChange={(e) => this.setState({ userId: e.target.value })}
        />

        <button onClick={this.fetchUser}>Search</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {notFound && <p style={{ color: "red" }}>User not found.</p>}

        {user && (
          <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        )}
      </div>
    );
  }
}

export default UserLookup;
