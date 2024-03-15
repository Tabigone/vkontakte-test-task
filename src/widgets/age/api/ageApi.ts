const getAge = async (
  name: string,
  signal: AbortSignal
): Promise<number | null> => {
  const response = await fetch(`https://api.agify.io/?name=${name}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(`Error with status: ${response.status}`);
  }
  const data = await response.json();
  return data.age;
};

const AgeApi = {
  getAge,
};

export default AgeApi;
