import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// env file used to to not hardcode data or vulnerable values like keys 
const githubUsername = process.env.REACT_APP_GITHUB_USERNAME;

const fetchCharacter = async () => {
  const response = await fetch(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`);
  return response.json();
};

const saveCharacter = async (characters) => {
  const response = await fetch(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characters),
  });
  return response.json();
};

export const useCharacterApi = () => {
    // choose reactQuery for the built in cache to reduce redundant calls 
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['character'],
    queryFn: fetchCharacter,
  });

  const mutation = useMutation({
    mutationFn: saveCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries(['character']);
    },
  });

  return {
    characters: data,
    isLoading,
    error,
    saveCharacter: mutation.mutate,
  };
};
