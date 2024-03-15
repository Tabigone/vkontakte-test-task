import { FactUI, AgeUI } from "../widgets";
import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { FunctionComponent, useState } from "react";

const App: FunctionComponent = () => {
  const [activePanel, setActivePanel] = useState<string>("facts");

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <FactUI id="facts" setActivePanel={setActivePanel} />
          <AgeUI id="age" setActivePanel={setActivePanel} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;
