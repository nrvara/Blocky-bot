import React from "react";
import { FormattedMessage } from "react-intl";

import musicIconURL from "./music/music.png";
import musicInsetIconURL from "./music/music-small.svg";

import penIconURL from "./pen/pen.png";
import penInsetIconURL from "./pen/pen-small.svg";

import videoSensingIconURL from "./videoSensing/video-sensing.png";
import videoSensingInsetIconURL from "./videoSensing/video-sensing-small.svg";

import text2speechIconURL from "./text2speech/text2speech.png";
import text2speechInsetIconURL from "./text2speech/text2speech-small.svg";

import translateIconURL from "./translate/translate.png";
import translateInsetIconURL from "./translate/translate-small.png";

import makeymakeyIconURL from "./makeymakey/makeymakey.png";
import makeymakeyInsetIconURL from "./makeymakey/makeymakey-small.svg";

import microbitIconURL from "./microbit/microbit.png";
import microbitInsetIconURL from "./microbit/microbit-small.svg";
import microbitConnectionIconURL from "./microbit/microbit-illustration.svg";
import microbitConnectionSmallIconURL from "./microbit/microbit-small.svg";

import ev3IconURL from "./ev3/ev3.png";
import ev3InsetIconURL from "./ev3/ev3-small.svg";
import ev3ConnectionIconURL from "./ev3/ev3-hub-illustration.svg";
import ev3ConnectionSmallIconURL from "./ev3/ev3-small.svg";

import wedo2IconURL from "./wedo2/wedo.png"; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from "./wedo2/wedo-small.svg";
import wedo2ConnectionIconURL from "./wedo2/wedo-illustration.svg";
import wedo2ConnectionSmallIconURL from "./wedo2/wedo-small.svg";
import wedo2ConnectionTipIconURL from "./wedo2/wedo-button-illustration.svg";

import boostIconURL from "./boost/boost.png";
import boostInsetIconURL from "./boost/boost-small.svg";
import boostConnectionIconURL from "./boost/boost-illustration.svg";
import boostConnectionSmallIconURL from "./boost/boost-small.svg";
import boostConnectionTipIconURL from "./boost/boost-button-illustration.svg";

import gdxforIconURL from "./gdxfor/gdxfor.png";
import gdxforInsetIconURL from "./gdxfor/gdxfor-small.svg";
import gdxforConnectionIconURL from "./gdxfor/gdxfor-illustration.svg";
import gdxforConnectionSmallIconURL from "./gdxfor/gdxfor-small.svg";

import chartImage from "./chart/chart.png";
import chartInsetIconURL from "./chart/chart-small.png";

import stockInfoImage from "./stockInfo/stockInfo.png";
import stockInfoInsetIconURL from "./stockInfo/stockInfo-small.png";

import googleMapImage from "./googleMap/googleMap.png";
import googleMapInsetIconURL from "./googleMap/googleMap-small.png";

import dataMiningImage from "./dataMining/dataMining.png";
import dataMiningInsetIconURL from "./dataMining/dataMining-small.png";

import dataProcessingImage from "./dataProcessing/dataProcessing.png";
import dataProcessingInsetIconURL from "./dataProcessing/dataProcessing-small.png";

import jsonImage from "./json/json.png";
import jsonInsetIconURL from "./json/clound-small.png";
import lassImage from "./lass/lass.png";
import lassInsetIconURL from "./lass/clound-small.png";
import iftttImage from "./ifttt/ifttt.png";
import iftttInsetIconURL from "./ifttt/clound-small.png";
import thingspeakImage from "./thingspeak/thingspeak.png";
import thingspeakInsetIconURL from "./thingspeak/clound-small.png";

import voicetotextImage from "./voicetotext/voicetotext.png";
import voicetotextInsetIconURL from "./voicetotext/voicetotext.svg";

import urltxtImage from "./urltxt/urltxt.png";
import urltxtInsetIconURL from "./urltxt/clound-small.png";
import rwGoogleImage from "./rwgoogle/rwgoogle.png";
import rwGoogleInsetIconURL from "./rwgoogle/clound-small.png";

import webserialArduinoImage from "./webserialArduino/webserialArduino.png";
import webserialArduinoInsetIconURL from "./webserialArduino/webserialArduino-small.png";

import webserialEsp8266Image from "./webserialEsp8266/webserialEsp.png";
import webserialEsp8266InsetIconURL from "./webserialEsp8266/webserialEsp-small.png";

import webserialEsp32Image from "./webserialEsp32/webserialEsp32.png";
import webserialEsp32InsetIconURL from "./webserialEsp32/webserialEsp-small.png";

import webserialPicoboardImage from "./webserialPicoboard/webserialPicoboard.png";
import webserialPicoboardInsetIconURL from "./webserialPicoboard/webserialPicoboard-small.png";
import webserialmicrobitIconURL from "./webserialMicrobit/microbit.png";
import webserialmicrobitInsetIconURL from "./webserialMicrobit/microbit-small.svg";

import mqttImage from "./mqtt/mqtt.png";
import mqttInsetIconURL from "./mqtt/mqtt-small.png";

import linenotifyImage from "./linenotify/linenotify.svg";
import linenotifyInsetIconURL from "./linenotify/linenotify_small.svg";

import telegrambotImage from "./telegrambot/telegrambot.svg";
import telegrambotInsetIconURL from "./telegrambot/telegrambot_small.svg";

import pushnotifyapiImage from "./pushnotifyapi/pushnotifyapi.svg";
import pushnotifyapiInsetIconURL from "./pushnotifyapi/pushnotifyapi_small.png";

import ml2scratchIconURL from "./ml2scratch/ml2scratch.png";
import ml2scratchInsetIconURL from "./ml2scratch/ml2scratch-small.png";

import posenet2scratchIconURL from "./posenet2scratch/posenet2scratch.png";
import posenet2scratchInsetIconURL from "./posenet2scratch/posenet2scratch-small.png";

import tm2scratchIconURL from "./tm2scratch/tm2scratch.png";
import tm2scratchInsetIconURL from "./tm2scratch/tm2scratch-small.png";

import tmpose2scratchIconURL from "./tmpose2scratch/tmpose2scratch.png";
import tmpose2scratchInsetIconURL from "./tmpose2scratch/tmpose2scratch-small.png";
import qrcodeIconURL from "./qrcode/qrcode.png";
import qrcodeInsetIconURL from "./qrcode/qrcode-small.svg";

let formatMessage = (messageData) => messageData.defaultMessage;
import microbitMoreIconURL from "./microbitMore/entry-icon.png";
import microbitMoreInsetIconURL from "./microbitMore/inset-icon.svg";
import microbitMoreConnectionIconURL from "./microbitMore/connection-icon.svg";
import microbitMoreConnectionSmallIconURL from "./microbitMore/connection-small-icon.svg";
import webserialLinkit7697Image from "./webserialLinkit7697/webserialLinkit7697.png";
import webserialLinkit7697InsetIconURL from "./webserialLinkit7697/webserialLinkit7697-small.png";
import openaiImage from "./openai/openai.png";
import openaiInsetIconURL from "./openai/openai-small.svg";

import geminiImage from "./gemini/gemini.png";
import geminiInsetIconURL from "./gemini/gemini-small.svg";

/*import ollamaImage from "./ollama/ollama.svg";
import ollamaInsetIconURL from "./ollama/ollama-small.svg";*/

import facemesh2scratchIconURL from "./facemesh2scratch/facemesh2scratch.png";
import facemesh2scratchInsetIconURL from "./facemesh2scratch/facemesh2scratch-small.png";
import handpose2scratchIconURL from "./handpose2scratch/handpose2scratch.png";
import handpose2scratchInsetIconURL from "./handpose2scratch/handpose2scratch-small.png";

import davinciImage from "./davinci/davinci.png";
import davinciInsetIconURL from "./davinci/davinci-small.png";
import llmstudioImage from "./llmstudio/llmstudio.svg";
import llmstudioInsetIconURL from "./llmstudio/llmstudio-small.png";

import ic2scratchImage from "./ic2scratch/ic2scratch.png";
import ic2scratchInsetIconURL from "./ic2scratch/ic2scratch-small.png";

import textSentimentImage from "./textSentiment/textSentiment.png";
import textSentimentInsetIconURL from "./textSentiment/textSentiment-small.png";

import faceExpressionRecogintionImage from "./faceExpressionRecogintion/faceExpressionRecogintion.png";
import faceExpressionRecogintionIconURL from "./faceExpressionRecogintion/faceExpressionRecogintion-small.png";

const version = "v2-0.2.4";

const translationMap = {
  en: {
    "gui.extension.microbitMore.description": `Play with all functions of micro:bit. (${version})`,
  },
  ja: {
    "gui.extension.microbitMore.description": `micro:bitのすべての機能で遊ぶ。 (${version})`,
  },
  "ja-Hira": {
    "gui.extension.microbitMore.description": `マイクロビットのすべてのきのうであそぶ。 (${version})`,
  },
  "zh-tw": {
    "gui.extension.microbitMore.description": `玩轉micro:bit所有功能. (${version})`,
  },
};

const extensions = [
  {
    name: "Web Serial ESP-32",
    extensionId: "webserialEsp32",
    collaborator: "Nirvara",
    iconURL: webserialEsp32Image,
    insetIconURL: webserialEsp32InsetIconURL,
    description: (
      <FormattedMessage
        defaultMessage="Connect ESP-32 and Google Chrome with Web Serial API."
        description="Webserial ESP-32 extension"
        id="gui.extension.WebserialEsp32.description"
      />
    ),
    featured: true,
    disabled: false,
    internetConnectionRequired: true,
    bluetoothRequired: false,
    helpLink: "https://sites.google.com/view/scratch-web-serial-api/",
  }
];
export { extensions };
export default extensions;
