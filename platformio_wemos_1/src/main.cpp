#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char* ssid = "Jangan Ngambil";
const char* password = "janganmencuri";
const char* mqtt_server = "iot.eclipse.org";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;
int FOGGER_1 = 0; //D3
int LIGHT_1 = 5; //D1

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  String topicString = String(topic);
  Serial.println();
  if(topicString == "initialState_ismail220a") {
    Serial.println("cool");
    int fogger1state = digitalRead(FOGGER_1);
    String stringFogger1State = String(fogger1state);

    int light1state = digitalRead(LIGHT_1);
    String stringLight1State = String(light1state);

    client.publish("initialStateOut_ismail220a/fogger/1", (char*)stringFogger1State.c_str());
    client.publish("initialStateOut_ismail220a/light/1", (char*)stringLight1State.c_str());
  }

  if(topicString == "inTopic_ismail220a/fogger/1") {
    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1') {
      digitalWrite(FOGGER_1, LOW);   // Turn the LED on (Note that LOW is the voltage level
      // but actually the LED is on; this is because
      // it is active low on the ESP-01)
    } else {
      digitalWrite(FOGGER_1, HIGH);  // Turn  the LED off by making the voltage HIGH
    }
  }

  if(topicString == "inTopic_ismail220a/light/1") {
    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1') {
      digitalWrite(LIGHT_1, LOW);   // Turn the LED on (Note that LOW is the voltage level
      // but actually the LED is on; this is because
      // it is active low on the ESP-01)
    } else {
      digitalWrite(LIGHT_1, HIGH);  // Turn  the LED off by making the voltage HIGH
    }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      // int state = digitalRead(LED_BUILTIN);
      // String stringState = String(state);
      // client.publish("outTopic_ismail220a", (char*)stringState.c_str());
      // ... and resubscribe
      client.subscribe("inTopic_ismail220a/fogger/1");
      client.subscribe("inTopic_ismail220a/light/1");
      client.subscribe("initialState_ismail220a");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(FOGGER_1, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(LIGHT_1, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
