import GetFact from "./components/GetFact/GetFact"
import GetAge from "./components/GetAge/GetAge"
import { SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { FunctionComponent, useState } from 'react';

const App: FunctionComponent = () => {
  const [activePanel, setActivePanel] = useState<string>('facts');

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <GetFact id='facts' setActivePanel={setActivePanel} />
          <GetAge id='age' setActivePanel={setActivePanel} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;