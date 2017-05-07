import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnimeTab from '../components/animeTab';
import FontAwesome from 'react-fontawesome';

class AnimePanelContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab className='tab allTitles'>
            All Anime
          </Tab>
          <Tab className='tab to-watch'>
            <FontAwesome
              className='tab to-watch'
              name='flag'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            To Watch
          </Tab>
          <Tab className='tab loved-it'>
            <FontAwesome
              className='tab loved-it'
              name='smile-o'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            Loved It!
          </Tab>
          <Tab className='tab meh'>
            <FontAwesome
              className='tab meh'
              name='meh-o'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            Meh.
          </Tab>
          <Tab className='tab hated-it'>
            <FontAwesome
              className='tab hated-it'
              name='frown-o'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            To Watch
          </Tab>
        </TabList>

        <TabPanel className='tab allTitles'>
          <AnimeTab
            filter="allTitles"
          />
        </TabPanel>
        <TabPanel className='tab to-watch'>
          <AnimeTab
            filter="toWatch"
          />
        </TabPanel>
        <TabPanel className='tab loved-it'>
          <AnimeTab
            filter="lovedIt"
          />
        </TabPanel>
        <TabPanel className='tab meh'>
          <AnimeTab
            filter="meh"
          />
        </TabPanel>
        <TabPanel className='tab hated-it'>
          <AnimeTab
            filter="hatedIt"
          />
        </TabPanel>
      </Tabs>
    );
  }
}

export default AnimePanelContainer;
