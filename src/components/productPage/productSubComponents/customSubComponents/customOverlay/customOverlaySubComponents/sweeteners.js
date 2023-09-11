import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";

function Sweeteners() {
  const [packets, setPackets] = useState([
    {
      title: "Sugar",
      amount: 0,
    },
    {
      title: "Honey",
      amount: 0,
    },
    {
      title: "Splenda",
      amount: 0,
    },
    {
      title: "Stevia",
      amount: 0,
    },
  ]);

  const [liquid, setLiquid] = useState([
    {
      title: "Classic Syrup",
      amount: 0,
    },
    {
      title: "Liquid Cane Sugar",
      amount: 0,
    },
    {
      title: "Honey Blend",
      amount: 0,
    },
  ]);

  const handlePacketAdd = (packetName) => {
    setPackets((prevState) =>
      prevState.map((packet) => {
        if (packet.title === packetName) {
          return {
            ...packet,
            amount: Math.min(packet.amount + 1, 10),
          };
        } else {
          return packet;
        }
      })
    );
  };

  const handlePacketSub = (packetName) => {
    setPackets((prevState) =>
      prevState.map((packet) => {
        if (packet.title === packetName) {
          return {
            ...packet,
            amount: Math.min(packet.amount - 1),
          };
        } else {
          return packet;
        }
      })
    );
  };

  const handleLiquidAdd = (liquidName) => {
    setLiquid((prevState) =>
      prevState.map((liquid) => {
        if (liquid.title === liquidName) {
          return {
            ...liquid,
            amount: Math.min(liquid.amount + 1, 10),
          };
        } else {
          return liquid;
        }
      })
    );
  };

  const handleLiquidSub = (liquidName) => {
    setLiquid((prevState) =>
      prevState.map((liquid) => {
        if (liquid.title === liquidName) {
          return {
            ...liquid,
            amount: Math.min(liquid.amount - 1),
          };
        } else {
          return liquid;
        }
      })
    );
  };

  return (
    <div className="custom-options-main">
      <p>Sweetners</p>
      {packets.map((packet, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {packet.amount === 0 && (
              <label className="custom-label">Add {packet.title} </label>
            )}
            {packet.amount === 1 && (
              <label className="custom-label">{packet.title} Packet</label>
            )}
            {packet.amount > 1 && (
              <label className="custom-label">{packet.title} Packets</label>
            )}
          </div>
          <div>
            {packet.amount >= 1 && (
              <span onClick={() => handlePacketSub(packet.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {packet.amount >= 1 && <p>{packet.amount}</p>}
            <span onClick={() => handlePacketAdd(packet.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
      <p>Liquid Sweetners</p>
      {liquid.map((liquid, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {liquid.amount === 0 && (
              <label className="custom-label">Add {liquid.title}</label>
            )}
            {liquid.amount === 1 && (
              <label className="custom-label">{liquid.title} Pump</label>
            )}
            {liquid.amount > 1 && (
              <label className="custom-label">{liquid.title} Pumps</label>
            )}
          </div>
          <div>
            {liquid.amount >= 1 && (
              <span onClick={() => handleLiquidSub(liquid.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {liquid.amount >= 1 && <p>{liquid.amount}</p>}
            <span onClick={() => handleLiquidAdd(liquid.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sweeteners;
