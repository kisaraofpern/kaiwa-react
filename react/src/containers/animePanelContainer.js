import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnimeTab from '../components/animeTab';
import UserTab from '../components/userTab';
import FontAwesome from 'react-fontawesome';

class AnimePanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { tabIndex: 0 }
  }

  render() {
    return (
      <Tabs
        selectedIndex = {this.state.tabIndex}
        onSelect = {tabIndex => this.setState({ tabIndex })}
      >
        <TabList>
          <Tab className='tab allTitles'>
            All Anime
          </Tab>
          <Tab className='tab to-watch'>
            <FontAwesome
              className='tab to-watch'
              name='flag'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
             To Watch
          </Tab>
          <Tab className='tab loved-it'>
            <FontAwesome
              className='tab loved-it'
              name='smile-o'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
             Loved It!
          </Tab>
          <Tab className='tab meh'>
            <FontAwesome
              className='tab meh'
              name='meh-o'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
             Meh.
          </Tab>
          <Tab className='tab hated-it'>
            <FontAwesome
              className='tab hated-it'
              name='frown-o'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
             Hated It
          </Tab>
          <Tab className='tab matches'>
            <FontAwesome
              className='tab matches'
              name='handshake-o'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
             Matches
          </Tab>
        </TabList>

        <TabPanel className='tab allTitles'>
          <AnimeTab className='tab allTitles'
            filter="allTitles"
          />
        </TabPanel>
        <TabPanel className='tab to-watch'>
          <AnimeTab className="tab to-watch"
            filter="toWatch"
          />
        </TabPanel>
        <TabPanel className='tab loved-it'>
          <AnimeTab className="tab loved-it"
            filter="lovedIt"
          />
        </TabPanel>
        <TabPanel className='tab meh'>
          <AnimeTab className="tab meh"
            filter="meh"
          />
        </TabPanel>
        <TabPanel className='tab hated-it'>
          <AnimeTab className="tab hated-it"
            filter="hatedIt"
          />
        </TabPanel>
        <TabPanel className ="tab matches">
          <UserTab className="tab matches"
          />
        </TabPanel>
      </Tabs>
    );
  }
}

export default AnimePanelContainer;
