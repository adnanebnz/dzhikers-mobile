import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { notifsSlice } from "../../state";
export default function Notifs({ navigation, route }) {
  const [notifs, setNotifs] = useState([]);
  const [hikes, setHikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await makeRequest.get(`announces/notifs/${id}`);
        setNotifs(res.data.announces);
        setHikes(res.data.hikeInfos);
        dispatch(notifsSlice.actions.setNotifs(res.data.announces));
        dispatch(notifsSlice.actions.setHikes(res.data.hikeInfos));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <ScrollView>
        {loading ? (
          <View style={tw`flex items-center justify-center h-full`}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
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
                      <View
                        style={{
                          ...tw`flex flex-row items-center justify-between w-full`,
                        }}
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
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                        }}
                      >
                        {notifs.map((notif) =>
                          notif.hikeId === item._id ? (
                            <View
                              style={tw`flex-col gap-2 justify-start`}
                              key={notif._id}
                            >
                              <Text style={tw`text-gray-800 text-xl`}>
                                {notif.title}
                              </Text>
                              <Text
                                style={{
                                  ...tw`text-gray-500 text-base`,
                                }}
                              >
                                {notif.description}
                              </Text>
                            </View>
                          ) : null
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <StatusBar animated={true} backgroundColor="#60a5fa" />
    </>
  );
}
