"use client";

import Title from "@/components/typography/Title";
import InputRadio from "./InputRadio";
import { useState } from "react";

export default function InputRadiosList(
  {
    showBigLabel = null,
    listRadioItems = [
      {
        value: "1",
        label: "Example 1"
      },
      {
        value: "2",
        label: "Example 2"
      },
      {
        value: "3",
        label: "Example 3"
      }
    ],
    defaultValue = "",
    onChange
  }
    :
    {
      showBigLabel: {
        title: string
        subtitle: string
      } | null,

      listRadioItems?: {
        value: string
        label: string
      }[],
      defaultValue?: string,
      onChange?: (value: string, object: { value: string, label: string }) => void
    }
) {

  const [value, setValue] = useState<string>(defaultValue || "");

  return <>

    <div className="input-radios-list z-input ">

      {
        showBigLabel !== null && <>
          <label className="big-label">
            {
              showBigLabel.title !== "" && <Title headingType='h3' headingStyle='Display-xs-Medium' color='--color-text-fg'>{showBigLabel.title}</Title>
            }
            {
              showBigLabel.subtitle !== "" && <Title headingType='p' headingStyle='Text-md-Regular' color='--color-text-fg-subtle'>{showBigLabel.subtitle}</Title>
            }
          </label>
        </>
      }

      <div className="input-radios-list-wrap">

        {
          listRadioItems.map((item) => (
            <label key={item.value} className={`input-radios-list-item ${value === item.value ? 'is-selected' : ''}`}>
              <InputRadio nameGroup={`-radi-group`} checked={value === item.value} onChange={() => {
                setValue(item.value);
                onChange?.(item.value, item);
              }} />
              <span>{item.label}</span>
            </label>
          ))
        }

      </div>

    </div>


  </>
}