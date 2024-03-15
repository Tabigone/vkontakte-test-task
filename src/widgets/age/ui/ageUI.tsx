import React, {
  FunctionComponent,
  useState,
  useEffect,
  FormEvent,
} from "react";
import {
  Panel,
  PanelHeader,
  Group,
  FormItem,
  Input,
  Button,
  CellButton,
  FormStatus,
} from "@vkontakte/vkui";
import AgeApi from "../api/ageApi";

const GetAgeUI: FunctionComponent<{
  id: string;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setActivePanel, id }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lastRequestedName, setLastRequestedName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setName(inputName);
    setError(null);
    setIsLoading(true);

    if (!/^[a-zA-Zа-яА-Я]*$/.test(inputName)) {
      setError("Пожалуйста, введите только буквы");
      setIsLoading(false);
    }

    if (/\d/.test(inputName)) {
      setError("Пожалуйста, не используйте цифры");
      setIsLoading(false);
    }
  };

  const submitHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (error) return;
    setError(null);

    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      if (name === lastRequestedName || /\d/.test(name)) {
        return;
      }

      setIsLoading(true);

      const ageResult = await AgeApi.getAge(name, controller.signal);
      setLastRequestedName(name);
      setAge(ageResult);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setAbortController(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      submitHandle({ preventDefault: () => {} } as FormEvent);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [submitHandle]);

  return (
    <Panel id={id}>
      <PanelHeader>Узнай возраст по имени</PanelHeader>
      <Group>
        <form onSubmit={submitHandle}>
          <FormItem>
            <Input
              onChange={changeHandle}
              value={name}
              style={{ resize: "none" }}
              name="GetAge"
              id="GetAge"
            ></Input>
          </FormItem>
          {!isLoading && name && !error && (
            <FormStatus
              mode="default"
              style={{ textAlign: "center" }}
            >{`Возраст ${name} составляет: ${
              age ? age : "такой человек не найден"
            }`}</FormStatus>
          )}
          {error && <FormStatus mode="error">{error}</FormStatus>}
          <FormItem>
            <Button type="submit" disabled={!name || !!error}>
              Узнать возраст
            </Button>
          </FormItem>
        </form>
      </Group>

      <CellButton onClick={() => setActivePanel("facts")}>
        Узнать случайный факт о котах
      </CellButton>
    </Panel>
  );
};

export default GetAgeUI;
