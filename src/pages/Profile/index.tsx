import React, { useRef, useCallback, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';

import LayoutBase from '../../components/Layouts/Base';
import InputText from '../../components/Input/Text';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  updateAvatarRequest,
  updateProfileRequest,
} from '../../store/modules/user/actions';
import { StoreStateTypes } from '../../store/types';

import {
  Form,
  Container,
  AvatarContainer,
  AvatarInput,
  InputContainer,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(
    (state: StoreStateTypes) => state.user,
  );
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          new_password: Yup.string().when('old_password', {
            is: (old_password) => !!old_password,
            then: Yup.string().min(
              8,
              'Nova senha deve ter no mínimo 8 caracters',
            ),
            otherwise: Yup.string(),
          }),
          new_password_confirmation: Yup.string()
            .when('old_password', {
              is: (old_password) => !!old_password,
              then: Yup.string().min(
                8,
                'Nova senha deve ter no mínimo 8 caracters',
              ),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('new_password'), null],
              'Senha de confirmação incorreta',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        dispatch(updateProfileRequest(data));
      } catch (err) {
        const validationErrors = getValidationsErrors(err);
        formRef.current?.setErrors(validationErrors);
      }
    },
    [dispatch],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        const avatarFile = e.target.files[0];

        data.append('avatar', avatarFile);
        dispatch(updateAvatarRequest(data));
      }
    },
    [dispatch],
  );

  return (
    <LayoutBase
      navMenuProps={{ visible: false }}
      breadcrumbs={[{ text: 'Meu Perfil' }]}
    >
      <div style={{ height: 30 }} />
      <Container>
        <AvatarContainer className="profile">
          <AvatarInput>
            <img src={profile.avatar_url} alt="Foto do perfil" />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <strong>{profile.name}</strong>
          <span>{profile.email}</span>
        </AvatarContainer>

        <InputContainer className="form">
          <h3>Informações</h3>
          <Form
            formRef={formRef}
            initialData={{
              name: profile.name,
              email: profile.email,
            }}
            onSubmit={handleSubmit}
          >
            <InputText
              startAdornment={<FiUser size={19} />}
              name="name"
              type="name"
              placeholder="Nome"
              xs={10}
            />
            <InputText
              startAdornment={<FiMail size={19} />}
              name="email"
              type="email"
              placeholder="E-mail"
            />

            <InputText
              startAdornment={<FiLock size={19} />}
              name="old_password"
              type="password"
              placeholder="Digite sua senha atual"
              autoComplete="on"
            />
            <InputText
              startAdornment={<FiLock size={19} />}
              name="new_password"
              type="password"
              placeholder="Digite sua nova senha"
              autoComplete="on"
            />
            <InputText
              startAdornment={<FiLock size={19} />}
              name="new_password_confirmation"
              type="password"
              placeholder="Confirme sua nova senha"
              autoComplete="on"
            />

            <Button loading={loading} type="submit">
              Salvar
            </Button>
          </Form>
        </InputContainer>
      </Container>
    </LayoutBase>
  );
};

export default Dashboard;
