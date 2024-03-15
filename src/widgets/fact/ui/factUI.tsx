import React, { FunctionComponent, useRef } from "react";
import {
  Panel,
  PanelHeader,
  Group,
  FormItem,
  Textarea,
  Button,
  CellButton,
} from "@vkontakte/vkui";
import FactApi from "../api/factApi";
import Fact from "../model/factModel";

const GetFactUI: FunctionComponent<{
  id: string;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setActivePanel, id }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const clickHandle = async () => {
    try {
      const data: Fact = await FactApi.getFact();

      if (textAreaRef.current) {
        const { fact } = data;

        textAreaRef.current.value = fact;
        textAreaRef.current.focus();

        const firstSpaceIndex = fact.indexOf(" ");
        const focusPosition =
          firstSpaceIndex !== -1 ? firstSpaceIndex + 1 : fact.length;
        textAreaRef.current.setSelectionRange(focusPosition, focusPosition);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>Узнай что-нибудь новое о котах!</PanelHeader>
      <Group>
        <FormItem>
          <Textarea
            getRef={textAreaRef}
            style={{ resize: "none" }}
            name="GetFact"
            id="GetFact"
            rows={5}
          ></Textarea>
        </FormItem>
        <FormItem>
          <Button onClick={clickHandle}>Получить факт о котах</Button>
        </FormItem>
      </Group>

      <CellButton onClick={() => setActivePanel("age")}>
        Узнать возраст по имени
      </CellButton>
    </Panel>
  );
};

export default GetFactUI;
