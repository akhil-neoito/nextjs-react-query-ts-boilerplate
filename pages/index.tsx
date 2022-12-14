import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { LoginBody } from '@/types/auth';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { type NextPageWithLayout } from './_app';
import PublicLayout from '@/layouts/PublicLayout';

const Login: NextPageWithLayout = () => {
  const { isLoading, mutateAsync: login, isError, error } = useLoginQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (isError) {
      toast.error(error as string, { theme: 'colored' });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    await login(data);
  };

  return (
    <form
      className="m-auto w-[90%] md:w-[30%] mt-[8%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-center text-sm mb-2">Username: user</p>
      <p className="text-center text-sm mb-3">Password: user</p>
      <Input
        errors={errors}
        placeholder="Username"
        label="Username"
        id="username"
        register={register}
        name="username"
      />
      <Input
        errors={errors}
        placeholder="Password"
        label="Password"
        type="password"
        register={register}
        name="password"
      />
      <Button text="Login" type="submit" isLoading={isLoading} />
    </form>
  );
};

Login.getLayout = (page) => <PublicLayout>{page}</PublicLayout>;

export default Login;
