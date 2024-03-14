import {
    Button,
    CellButton,
    FormItem,
    Group,
    Panel,
    PanelHeader,
    Textarea,
  } from '@vkontakte/vkui';
  import React, { FunctionComponent, useRef } from 'react';
  
  interface Fact {
    fact: string;
    length: number;
  }
  
  const GetFact: FunctionComponent<{
    id: string;
    setActivePanel: React.Dispatch<React.SetStateAction<string>>;
  }> = ({ setActivePanel, id }) => {
    const clickHandle = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
  
        if (!response.ok) {
          throw Error(`Error with status: ${response.status}`);
        }
  
        const data: Fact = await response.json();
  
        if (textAreaRef.current) {
          const { fact } = data;
  
          textAreaRef.current.value = fact;
          textAreaRef.current.focus();
  
          const firstSpaceIndex = fact.indexOf(' ');
          const focusPosition =
            firstSpaceIndex !== -1 ? firstSpaceIndex + 1 : fact.length;
          textAreaRef.current.setSelectionRange(focusPosition, focusPosition);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
  
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    return (
      <Panel id={id}>
        <PanelHeader>Узнайте что-нибудь новое о котах!</PanelHeader>
        <Group>
          <FormItem>
            <Textarea
              getRef={textAreaRef}
              style={{ resize: 'none' }}
              name="GetFact"
              id="GetFact"
              rows={5}
            ></Textarea>
          </FormItem>
          <FormItem>
            <Button onClick={clickHandle}>Получить факт о котах</Button>
          </FormItem>
        </Group>
  
        <CellButton onClick={() => setActivePanel('age')}>
          Найти возраст по имени
        </CellButton>
      </Panel>
    );
  };
  
  export default GetFact;