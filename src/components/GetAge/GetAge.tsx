import {
  Button,
  CellButton,
  FormItem,
  FormStatus,
  Group,
  Input,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

const GetAge: FunctionComponent<{
  id: string;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setActivePanel, id }) => {
  const [Name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lastRequestedName, setLastRequestedName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandle = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      if (Name === lastRequestedName) {
        return;
      }

      if (!/^[a-zA-Zа-яА-Я]+$/.test(Name)) {
        throw Error("Пожалуйста, введите текст");
      }

      setIsLoading(true);

      const response = await fetch(`https://api.agify.io/?name=${Name}`, {
        signal: controller.signal,
      });
      const data = await response.json();
      setLastRequestedName(Name);
      setAge(data.age);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`${error.message}`);
      }
    }

    setAbortController(null);
    setIsLoading(false);
  };

  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setName(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      submitHandle({ preventDefault: () => {} } as FormEvent);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [Name]);

  return (
    <Panel id={id}>
      <PanelHeader>Узнай возраст по имени</PanelHeader>
      <Group>
        <form onSubmit={submitHandle}>
          <FormItem>
            <Input
              onChange={changeHandle}
              value={Name}
              style={{ resize: "none" }}
              name="GetAge"
              id="GetAge"
            ></Input>
          </FormItem>
          {!isLoading && Name && !error && (
            <FormStatus
              mode="default"
              style={{ textAlign: "center" }}
            >{`Возраст ${Name} составляет: ${age ? age : "такой человек не нейден"}`}</FormStatus>
          )}
          {error && <FormStatus mode="error">{error}</FormStatus>}
          <FormItem>
            <Button type ="submit">Узнать возраст</Button>
          </FormItem>
        </form>
      </Group>

      <CellButton onClick={() => setActivePanel("facts")}>
        Получить случайный факт о котах
      </CellButton>
    </Panel>
  );
};

export default GetAge;
