import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SubscribeModal from "@/components/SubscribeModal";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const subscribeModalRef = useRef<BottomSheetModal>(null);

  const { user } = useUser();

  const handlePresentSubscribeModal = () =>
    subscribeModalRef.current?.present();

  const { signOut } = useAuth();

  return (
    <View style={[styles.container]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 35,
            height: 35,
            borderRadius: 99,
          }}
        />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
          {user?.fullName}
        </ThemedText>
      </View>
      <Animated.View style={styles.header} entering={FadeIn}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>
          Get 6 chances to guess a 5-letter word.
        </ThemedText>
      </Animated.View>
      <View style={styles.menu}>
        <Link
          href={"/game"}
          style={[
            styles.btn,
            { backgroundColor: colorScheme === "light" ? "#000" : "#4a4a4a" },
          ]}
          asChild
        >
          <AnimatedTouchableOpacity entering={FadeInLeft}>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </AnimatedTouchableOpacity>
        </Link>

        <SignedOut>
          <Link
            href={"/login"}
            style={[styles.btn, { borderColor: textColor }]}
            asChild
          >
            <AnimatedTouchableOpacity entering={FadeInLeft.delay(100)}>
              <ThemedText style={styles.btnText}>Log in</ThemedText>
            </AnimatedTouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <AnimatedTouchableOpacity
            onPress={() => signOut()}
            style={[styles.btn, { borderColor: textColor }]}
            entering={FadeInLeft.delay(100)}
          >
            <ThemedText style={styles.btnText}>Sign Out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>

        {/* <AnimatedTouchableOpacity
          entering={FadeInLeft.delay(300)}
          onPress={handlePresentSubscribeModal}
          style={[styles.btn, { borderColor: textColor }]}
        >
          <ThemedText style={styles.btnText}>Subscribe</ThemedText>
        </AnimatedTouchableOpacity> */}
        <View>
          <Text> </Text>
        </View>
      </View>
      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerDate}>
          {format(new Date(), "MMMM d, yyyy")}
        </ThemedText>
        <ThemedText style={styles.footerText}>Made by Bhushan</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 50,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
  },
  primaryItem: {
    backgroundColor: "#000",
  },
  primaryText: {
    color: "#fff",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
  },
});
