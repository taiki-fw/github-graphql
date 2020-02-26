import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const SEARCH_REPOSITORY = gql`
  {
    search(
      query: "language:JavaScript stars:>10000"
      type: REPOSITORY
      first: 10
    ) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            descriptionHTML
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }
`;

const Component = () => (
  <Query query={SEARCH_REPOSITORY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      const result = data.search;
      console.log(result);

      return (
        <div>
          <p>
            検索結果：
            <span style={{ fontSize: "1.25em" }}>{result.repositoryCount}</span>
            Repositories
          </p>
          <ul style={{ listStyle: "none", padding: "0 1em" }}>
            {result.edges.map((elm, index) => {
              let rep = elm.node;
              return (
                <li
                  key={index}
                  style={{
                    margin: "0 0 2em",
                    padding: "1em",
                    borderTop: "1px solid lightGray"
                  }}
                >
                  <p style={{ margin: "0 0 1em" }}>{rep.name}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: rep.descriptionHTML }}
                  />
                  <div>
                    <span style={{ fontSize: ".8em", marginRight: ".5em" }}>
                      {rep.stargazers.totalCount}stars
                    </span>
                    <span style={{ fontSize: ".8em", marginRight: ".5em" }}>
                      Updated: {rep.updatedAt}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Component;
