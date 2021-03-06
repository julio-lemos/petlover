/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import InputMask from 'react-input-mask';
import * as yup from 'yup';

import { useLoading } from '../../context';
import { createPet } from './../../service/petsService';

interface ModalRegistrationInterface {
  isOpen: boolean;
  children: React.ReactNode;
  isSubmitting: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

interface UfInterface {
  id: number;
  sigla: string;
  nome: string;
  regiao: any;
}

const ModalRegistration = ({
  isOpen,
  onClose,
  children,
  handleSubmit,
  isSubmitting,
}: ModalRegistrationInterface) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent mt="90px">
        <ModalHeader>Cadastrar Pet</ModalHeader>
        <hr />
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="secondary"
            mr={3}
            onClick={onClose}
            variant="ghost"
          >
            Close
          </Button>
          <Button
            variant="solid"
            bg="primary"
            _hover={{ bg: 'green.200' }}
            _active={{ bg: 'green.300' }}
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
          >
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const Registration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ufs, setUfs] = React.useState<UfInterface[]>([]);
  const { changeTrue } = useLoading();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    isSubmitting,
    resetForm,
  } = useFormik({
    onSubmit: async values => {
      try {
        await createPet(values);
        resetForm();
        changeTrue();
      } catch (err) {
        console.log('Erro: ', err);
      }
    },
    initialValues: {
      namePet: '',
      agePet: '',
      weightPet: '',
      animalPet: '',
      breedPet: '',
      nameProperty: '',
      telephoneProperty: '',
      emailProperty: '',
      addressProperty: '',
      districtProperty: '',
      cityProperty: '',
      ufProperty: '',
    },
    validationSchema: yup.object().shape({
      namePet: yup.string().required('Preenchimento obrigat??rio'),
      agePet: yup.number().required('Preenchimento obrigat??rio'),
      weightPet: yup.number().required('Preenchimento obrigat??rio'),
      animalPet: yup.string().required('Preenchimento obrigat??rio'),
      breedPet: yup.string().required('Preenchimento obrigat??rio'),
      nameProperty: yup.string().required('Preenchimento obrigat??rio'),
      telephoneProperty: yup.string().required('Preenchimento obrigat??rio'),
      emailProperty: yup.string().email('E-mail inv??lido'),
      addressProperty: yup.string().required('Preenchimento obrigat??rio'),
      districtProperty: yup.string().required('Preenchimento obrigat??rio'),
      cityProperty: yup.string().required('Preenchimento obrigat??rio'),
      ufProperty: yup.string().required('Preenchimento obrigat??rio'),
    }),
  });

  React.useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => {
        setUfs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Button
        bg="primary"
        _hover={{ bg: 'green.200' }}
        _active={{ bg: 'green.300' }}
        onClick={onOpen}
        size="md"
      >
        Cadastrar pet
      </Button>

      <ModalRegistration
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <FormControl mb={5}>
          <FormLabel>Nome do Pet</FormLabel>
          <Input
            type="text"
            name="namePet"
            value={values.namePet}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            variant="filled"
          />
          {touched.namePet && (
            <FormHelperText textColor="#e74c3c">
              {errors.namePet}
            </FormHelperText>
          )}
        </FormControl>

        <Box display={{ md: 'block', lg: 'flex' }} mb={5}>
          <FormControl mb={{ md: 5, lg: 0 }}>
            <FormLabel>Idade</FormLabel>
            <Input
              type="number"
              name="agePet"
              value={values.agePet}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.agePet && (
              <FormHelperText textColor="#e74c3c">
                {errors.agePet}
              </FormHelperText>
            )}
          </FormControl>

          <Box m={{ base: 5, lg: 0 }} />

          <FormControl ml={{ md: 0, lg: 3 }}>
            <FormLabel>Peso</FormLabel>
            <InputGroup>
              <Input
                type="number"
                name="weightPet"
                value={values.weightPet}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                variant="filled"
              />
              <InputRightAddon children="Kg" />
            </InputGroup>
            {touched.weightPet && (
              <FormHelperText textColor="#e74c3c">
                {errors.weightPet}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box display={{ md: 'block', lg: 'flex' }} mb={5}>
          <FormControl id="animalPet">
            <FormLabel>Animal</FormLabel>
            <Select
              placeholder="Selecione um animal"
              name="animalPet"
              value={values.animalPet}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Outro">Outros</option>
            </Select>
            {touched.animalPet && (
              <FormHelperText textColor="#e74c3c">
                {errors.animalPet}
              </FormHelperText>
            )}
          </FormControl>

          <Box m={{ base: 5, lg: 0 }} />

          <FormControl ml={{ md: 0, lg: 3 }}>
            <FormLabel>Ra??a</FormLabel>
            <Input
              type="text"
              name="breedPet"
              value={values.breedPet}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.breedPet && (
              <FormHelperText textColor="#e74c3c">
                {errors.breedPet}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl mb={5}>
          <FormLabel>Dono</FormLabel>
          <Input
            type="text"
            name="nameProperty"
            value={values.nameProperty}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            variant="filled"
          />
          {touched.nameProperty && (
            <FormHelperText textColor="#e74c3c">
              {errors.nameProperty}
            </FormHelperText>
          )}
        </FormControl>

        <Box display={{ md: 'block', lg: 'flex' }} mb={5}>
          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input
              as={InputMask}
              mask="(99) 99999-9999"
              type="text"
              name="telephoneProperty"
              value={values.telephoneProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.telephoneProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.telephoneProperty}
              </FormHelperText>
            )}
          </FormControl>

          <Box m={{ base: 5, lg: 0 }} />

          <FormControl ml={{ md: 0, lg: 3 }}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              name="emailProperty"
              value={values.emailProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.emailProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.emailProperty}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box display={{ md: 'block', lg: 'flex' }} mb={5}>
          <FormControl>
            <FormLabel>Endere??o</FormLabel>
            <Input
              type="text"
              name="addressProperty"
              value={values.addressProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.addressProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.addressProperty}
              </FormHelperText>
            )}
          </FormControl>

          <Box m={{ base: 5, lg: 0 }} />

          <FormControl ml={{ md: 0, lg: 3 }}>
            <FormLabel>Bairro</FormLabel>
            <Input
              type="text"
              name="districtProperty"
              value={values.districtProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.districtProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.districtProperty}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box display={{ md: 'block', lg: 'flex' }} mb={5}>
          <FormControl mb={5}>
            <FormLabel>Cidade</FormLabel>
            <Input
              type="text"
              name="cityProperty"
              value={values.cityProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            />
            {touched.cityProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.cityProperty}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl ml={{ md: 0, lg: 3 }}>
            <FormLabel>Estado</FormLabel>
            <Select
              placeholder="Selecione um estado"
              name="ufProperty"
              value={values.ufProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              variant="filled"
            >
              {ufs.map(uf => (
                <option value={uf.sigla} key={uf.id}>
                  {uf.nome}
                </option>
              ))}
            </Select>
            {touched.ufProperty && (
              <FormHelperText textColor="#e74c3c">
                {errors.ufProperty}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </ModalRegistration>
    </>
  );
};
