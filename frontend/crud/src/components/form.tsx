import React, { useEffect, useRef } from "react";
import { FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import axios from "axios";

export default function FormularioComponente({ getUser, onEdit, setOnEdit }: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onEdit) {
      nameRef.current!.value = onEdit.nome;
      emailRef.current!.value = onEdit.email;
      phoneRef.current!.value = onEdit.fone;
      birthDateRef.current!.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nome = nameRef.current!.value;
    const email = emailRef.current!.value;
    const fone = phoneRef.current!.value;
    const data_nascimento = birthDateRef.current!.value;

    if (!nome || !email || !fone || !data_nascimento) {
      return alert("Preencha todos os campos!");
    }

    try {
      const formData = {
        nome,
        email,
        fone,
        data_nascimento,
      };

      console.log("Dados do formulário:", formData);

      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, formData);
      } else {
        await axios.post("http://localhost:8800", formData);
      }
      alert("Operação realizada com sucesso!");
      getUser();
    } catch (error: any) {
      alert("Erro ao realizar a operação: " + error.message);
    }

    nameRef.current!.value = "";
    emailRef.current!.value = "";
    phoneRef.current!.value = "";
    birthDateRef.current!.value = "";

    setOnEdit(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        isRequired
        maxWidth={"1000px"}
        border={"1px solid gray"}
        borderRadius={"5px"}
        padding={"10px"}
      >
        <FormLabel marginTop={"10px"}>Name</FormLabel>
        <Input
          name="nome"
          id="nome"
          placeholder="Name"
          ref={nameRef}
        />

        <FormLabel marginTop={"10px"}>Email</FormLabel>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
        />

        <FormLabel marginTop={"10px"}>Phone</FormLabel>
        <Input
          name="fone"
          type="tel"
          placeholder="Phone number"
          ref={phoneRef}
        />

        <FormLabel marginTop={"10px"}>Birth Date</FormLabel>
        <Input
          name="data_nascimento"
          type="datetime-local"
          ref={birthDateRef}
        />

        <Button marginTop={"10px"} type="submit" colorScheme="blue">
          Add to Table
        </Button>
      </FormControl>
    </form>

    
  );
 
}
