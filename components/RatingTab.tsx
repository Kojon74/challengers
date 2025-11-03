import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SceneRendererProps } from "react-native-tab-view";

type SceneProps = {
  route: any;
} & Omit<SceneRendererProps, "layout">;

type RatingObj =
  | { rating: string; description: string }
  | {
      rating: string;
      strokes: string;
      serve: string;
      netPlay: string;
      return: string;
    };

const ratingGuide: RatingObj[] = [
  {
    rating: "1.0",
    description: "Just starting to play tennis",
  },
  {
    rating: "1.5",
    description: "Just starting to play tennis - lacking consistency",
  },
  {
    rating: "2.0",
    strokes:
      "Can get the ball in play but lacks control, resulting in inconsistent rallies. Often chooses to hit forehands instead of backhands.",
    serve:
      "Incomplete service motion. Toss is inconsistent. Double faults are common.",
    netPlay:
      "In singles, reluctant to come to the net. In doubles, understands basic positioning; comfortable only with forehand volley; avoids backhand volley and overhead.",
    return: "Tends to position to protect weaknesses. Inconsistent return.",
  },
  {
    rating: "2.5",
    strokes:
      "Can rally consistently 10 balls in a row, especially on the forehand, with an arched trajectory over the net when the objective is to hit to a partner at moderate speed.",
    serve:
      "Attempting full service motion on first serve. First serve inconsistent (less than 50%). Uses incomplete motion for steady second serve.",
    netPlay:
      "Becoming at ease at net in practice but uncomfortable in game situation.",
    return:
      "In singles, consistent when returning towards the middle of the court. In doubles, difficulty returning crosscourt to start the point.",
  },
  {
    rating: "3.0",
    strokes:
      "Able to rally consistently 10 balls in a row on forehands and backhands. Able to maintain rally when receiving high, short or wide balls at moderate pace, especially on forehand stroke.",
    serve:
      "Full motion on both serves. Able to achieve more than 50% success on first serve. Second serve much slower than first serve.",
    netPlay:
      "Very consistent on forehand volley with easy balls, inconsistent on backhand volley. Overall has difficulty with low and wide balls. Can smash easy lobs.",
    return:
      "Can control direction of ball in both singles and doubles when receiving a serve of moderate pace.",
  },
  {
    rating: "3.5",
    strokes:
      "Able to move opponent around court or hit harder when receiving easier balls. Can execute approach shots with some consistency (more than 50%).",
    serve:
      "Can vary speed or direction of first serve. Can direct second serve to opponent's weakness without double-faulting regularly.",
    netPlay:
      "Becoming confident at net play; can direct FH volleys; controls BH volley but with little offense; general difficulty putting volleys away. Can handle volleys and overheads requiring moderate movement.",
    return:
      "Can return fast serves or well-placed serves with defensive actions. On easy second serve, can return with pace or directional control; can approach net in doubles.",
  },
  {
    rating: "4.0",
    strokes:
      "Able to develop points with some consistency using reliable combination of shots. Erratic when attempting quality shot, receiving fast or wide balls, and attempting passing shots.",
    serve: "Can vary speed and direction of first serve. Uses spin.",
    netPlay:
      "In singles, comfortable following approach shot to net. In doubles, comfortable receiving variety of balls and converting to offensive positioning; can poach on weak returns of serve. Able to put away easy overheads.",
    return:
      "Difficulty returning spin serves and very fast serves. On moderately paced serves, can construct point through hitting good shot or exploiting opponent's weakness. In doubles, can vary returns effectively on moderately paced serves.",
  },
  {
    rating: "4.5",
    strokes:
      "Can use variety of spins. Beginning to develop dominant shot or good steadiness. Erratic when attempting quality shot in two of: receiving fast balls, wide balls, passing shot situations.",
    serve:
      "Aggressive first serve with power and spin. On second serve frequently hits with good depth and placement without double faults. Can serve and volley off first serves in doubles, but experiences some inconsistency.",
    netPlay:
      "When coming to net after serving, consistently able to put first volley in play but without pace or depth; however, inconsistent when trying to volley powerful or angled returns. Close to net, can finish point using various options including drop volley, angle volley, punch volley.",
    return:
      "Off first serves, can defend consistently but very inconsistent (less than 30%) when attempting aggressive return. In doubles, difficulty (less than 50%) returning first serve at feet of incoming serve and volleyer.",
  },
  {
    rating: "5.0",
    strokes:
      "Able to maintain consistent rally, 10 balls in a row on faster balls. Very steady strokes or has dominant shot. Periodically succeeds (50%) attempting quality shot when receiving fast or wide balls, in passing shot situations.",
    serve:
      "First serve can win points outright, or force weak return. Second serve can prevent opponent from attacking. Serve and volleys on first serves in doubles with consistency.",
    netPlay:
      "In doubles, after the serve, has good, deep crosscourt volley. Overhead can be hit from almost any position.",
    return:
      "Periodically succeeds (50%) at aggressive return off fast first serves using dominant shot (forehand or backhand). In doubles can return at feet of serve and volleyer.",
  },
  {
    rating: "5.5",
    description:
      "Player has developed recognizable game style (all court, aggressive baseliner, serve and volleyer, or retriever). Has good anticipation technically or tactically. No major weaknesses. Can counterattack effectively. Capable of competing in 'open' category provincial level tournaments. Can use specific shots to exploit opponent's weakness.",
  },
  {
    rating: "6.0\n-\n7.0",
    description:
      "These players typically have intensive training and competitive experience. 6.0 has provincial/national ranking. 6.5 has extensive international tournament experience. 7.0 is world class professional.",
  },
];

const RatingTab = ({ route }: SceneProps) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      {ratingGuide.map((level) => (
        <View key={level.rating} style={styles.row}>
          <Text style={styles.ratingText}>{level.rating}</Text>
          <Text style={styles.descriptionText}>
            {"description" in level
              ? level.description
              : level[route.key as keyof RatingObj]}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RatingTab;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10 },
  row: { flexDirection: "row", marginVertical: 5, gap: 5 },
  ratingText: { textAlign: "center", fontWeight: "700" },
});
