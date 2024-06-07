import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const githubUsername = process.env.REACT_APP_GITHUB_USERNAME;

const fetchCharacter = async () => {
  const response = await fetch(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`);
  console.log('Response =>', response)
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
