import RatingTab from "@/components/RatingTab";
import { colours } from "@/theme/colours";
import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Route,
  SceneMap,
  TabBar,
  TabBarProps,
  TabView,
} from "react-native-tab-view";

const renderScene = SceneMap({
  strokes: RatingTab,
  return: RatingTab,
  netPlay: RatingTab,
  serve: RatingTab,
});

const routes = [
  { key: "strokes", title: "Ground strokes" },
  { key: "return", title: "Return of serve" },
  { key: "netPlay", title: "Net play" },
  { key: "serve", title: "Serve" },
];

const renderTabBar = (props: TabBarProps<Route>) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colours.charcoal }}
    style={{ backgroundColor: "transparent" }}
    activeColor={colours.charcoal}
    inactiveColor={colours.charcoal}
  />
);

const RatingModal = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default RatingModal;

const styles = StyleSheet.create({ tabView: {} });
