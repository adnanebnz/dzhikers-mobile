import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { makeRequest } from "../../makeRequest";
import { useState } from "react";
import { ScrollView } from "react-native";
const BookingListing = ({ navigation, route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(`/reservations/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  const handleDeleteReservation = async (id) => {
    setLoading(true);
    try {
      const res = await makeRequest.delete(`/reservations/${id}`);
      setMsg(res.data.message);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View style={tw`flex items-center justify-center h-full`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={tw`h-full p-3`}>
            {data.length === 0 ? (
              <View style={tw`flex items-center justify-center mt-5`}>
                <Text style={tw`text-[16px] font-medium`}>
                  Vous n'avez pas encore réservé de randonnée
                </Text>
              </View>
            ) : (
              <View style={tw`flex flex-col gap-2`}>
                {data.map((item) => (
                  <View
                    key={item._id}
                    style={{
                      ...tw`flex-row items-center justify-between my-2 bg-gray-200 rounded-lg px-3 py-2`,
                    }}
                  >
                    <View
                      key={item._id}
                      style={{
                        ...tw`flex-col gap-[1px]`,
                      }}
                    >
                      <Text style={tw`text-lg font-medium`}>
                        <Ionicons name="location-outline" size={24} />
                        {item.hikeTitle}
                      </Text>

                      <Text style={tw`text-gray-500 text-[12px]`}>
                        organisateur : {item.organizerUsername}
                      </Text>
                      <Text style={tw`text-green-500 text-[14px]`}>
                        {item.price} DZD
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={tw`rounded-full bg-gray-200 p-2`}
                        onPress={() => {
                          handleDeleteReservation(item._id);
                        }}
                      >
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default BookingListing;
