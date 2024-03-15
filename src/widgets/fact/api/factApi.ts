import Fact from "../model/factModel";

const getFact = async (): Promise<Fact> => {
  const response = await fetch("https://catfact.ninja/fact");
  if (!response.ok) {
    throw new Error(`Error with status: ${response.status}`);
  }
  return response.json();
};

const FactApi = { getFact };

export default FactApi;
