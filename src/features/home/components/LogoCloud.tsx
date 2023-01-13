import React from "react";
import openSea from "src/assets/brands/OpenSea-Logo.png";
import github from "src/assets/brands/github.svg";
import discord from "src/assets/brands/discord.svg";
import twitter from "src/assets/brands/twitter.svg";
import twitch from "src/assets/brands/twitch.svg";

export const LogoCloud: React.FC = () => (
  <section className="bg-white py-24 2xl:py-44">
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 xl:w-1/2 px-4">
          <span className="mb-9 block font-medium uppercase tracking-widest text-xs leading-4 text-gray-300">
            Where to find us?
          </span>
          <h2 className="mb-16 font-heading font-medium text-9xl md:text-10xl xl:text-11xl leading-none">
            Join the community
          </h2>
          <p className="text-lg leading-6 mb-20 xl:mb-0 text-darkBlueGray-400">
            Come build the future of the MetaVerse with us!
          </p>
        </div>
        <div className="w-full lg:w-2/3 xl:w-1/2 px-4">
          <div className="flex flex-wrap">
            <a
              href="https://discord.gg/sunflowerland"
              className="w-full md:w-2/5 px-1 mb-5"
            >
              <div className="flex items-center py-4 px-4 bg-gray-50 rounded-9xl">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
                  <img className="h-8 grayscale" src={openSea} alt="" />
                </div>
                <div>
                  <p className="ml-6 font-heading font-medium text-2xl">
                    Open Sea
                  </p>
                  <p className="ml-6 font-light  text-base">100+ Items</p>
                </div>
              </div>
            </a>
            <a
              href="https://github.com/sunflower-land/sunflower-land"
              className="w-full md:w-2/5 px-1 mb-5"
            >
              <div className="flex items-center py-4 px-4 bg-gray-50 rounded-9xl">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
                  <img className="h-5" src={github} alt="" />
                </div>
                <div>
                  <p className="ml-6 font-heading font-medium text-2xl">
                    Github
                  </p>
                  <p className="ml-6 font-light  text-base">60+ developers</p>
                </div>
              </div>
            </a>
            <a
              href="https://discord.gg/sunflowerland"
              className="md:ml-auto w-full md:w-2/5 px-1 mb-5"
            >
              <div className="flex items-center py-4 px-4 bg-gray-50 rounded-9xl">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
                  <img className="h-8 grayscale" src={discord} alt="" />
                </div>
                <div>
                  <p className="ml-6 font-heading font-medium text-2xl">
                    Discord
                  </p>
                  <p className="ml-6 font-light  text-base">175,000+ Players</p>
                </div>
              </div>
            </a>
            <a
              href="https://twitter.com/0xsunflowerland?lang=en"
              className="w-full md:w-2/5 px-1 mb-5"
            >
              <div className="flex items-center py-4 px-4 bg-gray-50 rounded-9xl">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
                  <img className="h-8 grayscale" src={twitter} alt="" />
                </div>
                <div>
                  <p className="ml-6 font-heading font-medium text-2xl">
                    Twitter
                  </p>
                  <p className="ml-6 font-light  text-base">37K</p>
                </div>
              </div>
            </a>
            <a
              href="https://www.twitch.tv/0xsunflowerstudios"
              className="md:mx-auto w-full md:w-2/5 px-1 mb-5"
            >
              <div className="flex items-center py-4 px-4 bg-gray-50 rounded-9xl">
                <div className="flex items-center justify-center w-16 h-16 p-2 bg-white rounded-5xl shadow-sm">
                  <img className="h-8 grayscale" src={twitch} alt="" />
                </div>
                <div>
                  <p className="ml-6 font-heading font-medium text-2xl">
                    Twitch
                  </p>
                  <p className="ml-6 font-light  text-base">1K followers</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
