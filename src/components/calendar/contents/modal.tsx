import { Dimensions, View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { match } from "../../../model/main.dto";
import Modal from 'react-native-modal';
import { MatchBar } from "../../matchBar/matchBar";

interface  MatchModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    matchList: match[] | null
  }
  

export const MatchModal: React.FC< MatchModalProps> = ({ isVisible, setIsVisible, matchList }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} // 바깥 터치 시 닫기
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
    >
      <View style={[styles.modalView, { width: width*1, height: height*0.5, opacity: 1}]}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {matchList?.map((match: match, index: number) => {
            return (
              <MatchBar
                key={index}
                match={match}
                color={'blue'}
              />
            );
          })}
        </ScrollView>
        <Button title="닫기" onPress={() => setIsVisible(false)} />
      </View>
    </Modal>)
}
const styles = StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      opacity: 1,
      paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})