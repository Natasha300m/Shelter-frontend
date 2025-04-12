import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ICreateNewsData,
  createNewsMutation,
  createNewsSchema,
  getAllSheltersQuery
} from '../../queries';

const shelters = [
  { id: '1', name: 'Peshka navalskogo' },
  { id: '2', name: 'Шустрие джентельмені 2.6' },
  { id: '3', name: 'Некоглай' }
];

function CreateNewsItemPage() {
  //   const {
  //     data: shelters,
  //     isError,
  //     error,
  //     isFetched
  //   } = useQuery({
  //     queryKey: ['shelters'],
  //     queryFn: getAllSheltersQuery
  //   });

  const { isError, isPending, error, mutateAsync } = useMutation({
    mutationFn: createNewsMutation
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateNewsData>({ resolver: yupResolver(createNewsSchema) });

  const onSubmit: SubmitHandler<ICreateNewsData> = useCallback(
    async (data) => {
      if (!isPending) await mutateAsync(data);
    },
    [mutateAsync, isPending]
  );

  return (
    <section className="containerX pt-8">
      <h2>У меня хуй тупо километровый</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('title')} placeholder="Title" />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <textarea {...register('content')} placeholder="Content" />
          {errors.content && <span>{errors.content.message}</span>}
        </div>

        <div>
          <select {...register('shelterID')} defaultValue={''}>
            <option hidden value={''}>
              Притулок
            </option>
            {shelters.map((shelter) => (
              <option key={shelter.id} value={shelter.id}>
                {shelter.name}
              </option>
            ))}
          </select>
          {errors.shelterID && <span>{errors.shelterID.message}</span>}
        </div>

        <button>Post news</button>
      </form>
      {isError && (
        <div>
          {error.name}
          {error.message}
        </div>
      )}
    </section>
  );
}

export { CreateNewsItemPage };
