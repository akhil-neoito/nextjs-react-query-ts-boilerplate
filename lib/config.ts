interface Config {
  newsApiKey: string;
  reactQuery: {
    staleTime: number;
  };
}

const config: Config = {
  newsApiKey: "pub_97975dc870625c92568f10bdbf1cb8a0f9a9",
  reactQuery: {
    staleTime: 10000,
  },
};

export const { newsApiKey, reactQuery } = config;
export default config;
