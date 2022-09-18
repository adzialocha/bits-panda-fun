import { GraphQLClient, gql } from 'graphql-request';

const ENDPOINT = 'http://localhost:2020/graphql';

const client = new GraphQLClient(ENDPOINT);

export async function nextArgs(publicKey, viewId) {
  const query = gql`
    query NextArgs($publicKey: String!, $viewId: String) {
      nextArgs(publicKey: $publicKey, viewId: $viewId) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const { nextArgs } = await client.request(query, {
    publicKey,
    viewId,
  });

  return nextArgs;
}

export async function publish(entry, operation) {
  const query = gql`
    mutation Publish($entry: String!, $operation: String!) {
      publish(entry: $entry, operation: $operation) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const { publish } = await client.request(query, {
    entry,
    operation,
  });

  return publish;
}
