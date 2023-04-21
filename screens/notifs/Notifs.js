import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { ScrollView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";
import moment from "moment";
export default function Notifs({ navigation, route }) {
  const [notifs, setNotifs] = useState([]);
  const [hikes, setHikes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = route.params;
  const fetchNotifs = async () => {
    try {
      const res = await makeRequest.get(`announces/notifs/${id}`);
      setNotifs(res.data.announces);
      setHikes(res.data.hikeInfos);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifs();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchNotifs();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      {loading ? (
        <View
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={"#374151"}
              colors={["#fff"]}
            />
          }
        >
          <View style={tw`p-3`}>
            {notifs.length === 0 ? (
              <View style={tw`flex items-center justify-center mt-5`}>
                <Text style={tw`text-[16px] font-medium`}>
                  Pas de notifications pour le moment
                </Text>
              </View>
            ) : (
              <View style={tw`flex flex-col gap-2`}>
                {hikes.map((item) => (
                  <View
                    style={{
                      ...tw` flex flex-col justify-between my-2 bg-white rounded-lg px-3 py-2 shadow-md`,
                    }}
                    key={item._id}
                  >
                    <View style={tw`flex-row items-center gap-2`}>
                      <Image
                        source={{
                          uri: item.img,
                        }}
                        style={{
                          ...tw`w-14 h-14 rounded-full`,
                        }}
                      />
                      <View>
                        <Text style={tw`font-medium`}>{item.title}</Text>
                      </View>
                      <View>
                        <Text style={tw`text-gray-400`}>
                          prévu le {item.date.split("T")[0]}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      {notifs.map((notif) =>
                        notif.hikeId === item._id ? (
                          <View key={notif._id}>
                            <View style={tw`flex-col gap-2 justify-start`}>
                              <Text style={tw`text-black text-xl`}>
                                {notif.title}
                              </Text>
                              <Text
                                style={{
                                  ...tw`text-gray-800 text-base`,
                                }}
                              >
                                {notif.description}
                              </Text>
                            </View>

                            <View
                              style={{
                                ...tw`mt-5 mb-2`,
                              }}
                            >
                              <Text
                                style={{
                                  ...tw`text-gray-600 text-[13px]`,
                                }}
                              >
                                Envoyée le{" "}
                                {moment(notif.createdAt).format("LLL")}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...tw`border-b border-gray-300 my-1`,
                              }}
                            />
                          </View>
                        ) : null
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <StatusBar animated={true} backgroundColor="#60a5fa" />
    </>
  );
}
