import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnimeTab from '../components/animeTab';
import FontAwesome from 'react-fontawesome';

class AnimePanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeTagArray: [],
      toWatchArray: [],
      lovedItArray: [],
      mehArray: [],
      hatedItArray: []
    };
    this.currentUserAnimeTags = this.currentUserAnimeTags.bind(this);
  }

  componentDidMount() {
    this.currentUserAnimeTags();
  }

  currentUserAnimeTags() {
    let proto_uri="/api/v1/animetagsapi?";
    proto_uri += `userid=${this.props.currentUser.id}`;

    let uri=encodeURI(proto_uri);

    fetch(uri, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newAnimeTagArray = [];
      let newToWatchArray = [];
      let newLovedItArray = [];
      let newMehArray = [];
      let newHatedItArray = [];

      responseData.forEach( (animeTagObject) => {
        if (!newAnimeTagArray.includes(animeTagObject.anilist_id)) {
          newAnimeTagArray.push(animeTagObject.anilist_id);
        }
        switch(animeTagObject.tag_id) {
          case 0:
            newToWatchArray.push(animeTagObject.anilist_id);
            break;
          case 1:
            newLovedItArray.push(animeTagObject.anilist_id);
            break;
          case 2:
            newMehArray.push(animeTagObject.anilist_id);
            break;
          case 3:
            newHatedItArray.push(animeTagObject.anilist_id);
        }
      });
      this.setState({
        animeTagArray: newAnimeTagArray,
        toWatchArray: newToWatchArray,
        lovedItArray: newLovedItArray,
        mehArray: newMehArray,
        hatedItArray: newHatedItArray
       });
    });
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
            filtered_anime_tags={this.state.animeTagArray}
            currentUser = {this.props.currentUser}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </TabPanel>
        <TabPanel className='tab to-watch'>
          <AnimeTab
            filtered_anime_tags={this.state.toWatchArray}
            currentUser = {this.props.currentUser}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </TabPanel>
        <TabPanel className='tab loved-it'>
          <AnimeTab
            filtered_anime_tags={this.state.lovedItArray}
            currentUser = {this.props.currentUser}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </TabPanel>
        <TabPanel className='tab meh'>
          <AnimeTab
            filtered_anime_tags={this.state.mehArray}
            currentUser = {this.props.currentUser}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </TabPanel>
        <TabPanel className='tab hated-it'>
          <AnimeTab
            filtered_anime_tags={this.state.hatedItArray}
            currentUser = {this.props.currentUser}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

export default AnimePanelContainer;
