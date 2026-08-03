"use client";

import InputRadio from "@/components/forms/inputs/InputRadio";
import Title from "@/components/typography/Title";
import { useState } from "react";
import { Collapse } from "react-bootstrap";


export interface IRadioSlidingPanelsContent{
  slug: string,
  leftTitle:string,
  leftSubtitle?:string,
  rightTitle?: string,
  rightSubtitle?: string,
  content?: string | React.ReactNode | React.ReactNode[],
  // activeRadio?:string
}

export default function RadioSlidingPanels(
  {
    panelId,
    title,
    panels,
    activeRadio,
    afterChange,
  }
  :
  {
    panelId:string,
    title: string,
    activeRadio?:string;
    panels:IRadioSlidingPanelsContent[],
    afterChange?:(slug:string) => void
  }
){
  

  // const [openCollapse, setOpenCollapse] = useState<string>("");
  const [activeSlug, setActiveSlug] = useState<string>(
    activeRadio ? 
    activeRadio 
    : 
    (
      panels.length>0?panels[0].slug:""
    )
    
  );

  /*const panels:IRadioSlidingPanelsContent[] = [

    {slug: "panel-1", content:"Example Content 1"},
    {slug: "panel-2", content:"Example Content 2"},
    {slug: "panel-3", content:"Example Content 3"},

  ];*/
  
  return <>
  <div className="radio-sliding-panels">
    <Title headingType="h3" headingStyle="Text-md-Medium" color="--color-text-fg">{title}</Title>

    <div className="panels-wrap">
      {
        panels.map((panel, index)=>{
          return <div 
            key={`panel-${index}`} 
            // key={`panel-${panel.slug}-${index}`}
            className="panel" 
            onClick={()=>{
              if(activeSlug!==panel.slug){
                setActiveSlug(panel.slug);
                afterChange?.(panel.slug);
              }
            }} 
            >
            
            
            <div className="heading">
              <div className="heading-content-left">
                <div className="content-wrap">

                  <InputRadio nameGroup={`${panelId}-radi-group`} checked={activeSlug === panel.slug} onChange={()=>{
                    
                  }} />

                  <div className="heading-left-inner-content">
                    <Title headingType="h4" headingStyle="Text-md-Medium" color="--color-text-fg">{panel.leftTitle}</Title>
                    {
                      panel.leftSubtitle && <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">{panel.leftSubtitle}</Title>
                    }
                  </div>
                </div>
              </div>
              <div className="heading-content-right">
                {
                  panel.rightTitle && <Title headingType="h4" headingStyle="Text-md-Medium" color="--color-text-fg">{
                    panel.rightTitle
                  }</Title>
                }
                {
                  panel.rightSubtitle && <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">{panel.rightSubtitle}</Title>
                }
              </div>
            </div>

            {
              panel.content && <Collapse 
                in={activeSlug === panel.slug}
                >
              <div>
                <div className="panel-content">
                  {
                    panel.content
                  }
                </div>
              </div>
            </Collapse>
            }
            


          </div>
        })
      }
    </div>

  </div>
  </>
}