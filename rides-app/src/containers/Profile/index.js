import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as AccountActions from '../../actions/account';

import styled from 'styled-components';

import {PageTitle, Content, MainSection, styledMedia} from '../../components/styled-components';

import {withRouter} from 'react-router-dom';

import {Rate, Button as AntButton, Input} from 'antd';

import FileUploader from '../../components/FileUploader';

import moment from 'moment';

import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';

import {Helmet} from 'react-helmet';

import Vehicles from './Vehicles';
import { DATE_SHORT_FORMAT } from '../../constants';


export const Page = styled.div`
  margin-bottom: 100px;
`;

export const ProfilePage = styled(Page)`
`;

export const LeftProfile = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const RightProfile = styled.div`
  display: flex;
  flex-flow: column;
  flex: 2;
  padding-left: 0.5em;

  ${styledMedia.lessThan('tablet')`
    margin-top: 1em;
  `}
`;

export const PrimaryButton = styled(AntButton)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
}

export const SaveProfile = styled(PrimaryButton)`
`;

export const CancelProfile = styled(AntButton)`
  margin-right: 1em;
`;

export const Button = styled(AntButton)`
  width: 150px;
  white-space: initial;
  height: inherit;
`;

export const ProfileButton = styled(Button)`
  margin: 1em;
  margin-left: 0;
  padding: 0.5em;
`;

export const AboutMeWrapper = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 500px;
  width: 100%;
  align-self: flex-end;

  ${styledMedia.lessThan('tablet')`
    width: 100%;
    max-width: initial;
  `}
`;

export const AboutMeEdit = styled(Input.TextArea)`

`;

export const AboutMeReadOnly = styled.div`
  margin: 1em;
`;

export const ProfileRating = styled(Rate)`
  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

export const MainContent = styled(Content)`
  display: flex;
  flex-direction: column;
`;

export const MainContentContent = styled(Content)`
  display: flex;
  flex-direction: row;
  padding: 0 1em;

  ${styledMedia.lessThan('tablet')`
    flex-flow: column;
  `} 
`;

export const UploadButtons = styled.div`
  display: flex;

  ${styledMedia.lessThan('tablet')`
    justify-content: center;
  `}
`;

export const HeaderContent = styled(Content)`
  position: relative;
`

export const CoverPhotoWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 35% 0 0 0;
  overflow: hidden;
  background: black;
`;

export const CoverPhoto = styled.img`
  position: absolute;
  display: block;
  max-width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const CoverPhotoButtons = styled.div`
  position: absolute;
  display: block;
  max-width: 100%;
  right: 0;
  margin: auto;
  bottom: 0;
  margin-right: 1em;
  margin-bottom: 1em;
`;
export const UserNameSection = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  padding: 0 0.5em;
  z-index: 1;
`

export const ProfileImageWrapper = styled.div`
  width: 20%;
  min-width: 50px;
  margin-top: -18%;
  z-index: 1;

  ${styledMedia.lessThan('desktop')`
    width: 22.5%;
  `}

  ${styledMedia.lessThan('tablet')`
    width: 25%;
  `}
`;

export const ResponsiveWrapper = styled.div`
  position: relative;
  height: 0;
  padding: 100% 0 0 0;
  background: black;
  overflow: hidden;
  border: 1px solid white;
  border-radius: 100%;
`;

export const ProfileImage = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const Name = styled.div`
  line-height: 1;
  font-size: 48px;

  ${styledMedia.lessThan('desktop')`
    font-size: 32px;
  `}

  ${styledMedia.lessThan('tablet')`
    font-size: 24px;
  `}
`;

export const ProfileImageEditButton = styled.div`
`;

export const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

export const MainContentHeader = styled.div`
  display: flex;
  padding: 0 1em;

  ${styledMedia.lessThan('tablet')`
    flex-flow: column;
    align-items: center;
  `}
`;

export const ShareButtons = styled.div`
  display: flex;

  > div {
    margin-left: 1em;
  }
`;


class Profile extends React.Component {
  constructor(props) {
    super();
    const {actions, match: {params: {profileAccountId}}} = props;

    let isPublic;
    if (profileAccountId) {
      actions.getDriverProfileData(profileAccountId);
      isPublic = true;
    }
    else {
      actions.getUserProfileData();
      isPublic = false;
    }

    this.state = {
      isPublic
    };
  }

  componentDidMount() {
    window.document.querySelector('body').scrollTop = 0;
  }

  componentWillUnmount() {
    const {actions} = this.props;

    actions.clearProfilePage();
  }

  onSelectProfilePhoto() {

  }

  renderHeaderContent() {
    const {userId, account: {picture, coverPhoto, aboutText, firstName}, actions, isEditable} = this.props;
    const {isPublic} = this.state;
    return (
      <React.Fragment>
        <div>
          <CoverPhotoWrapper>
            {/* https://via.placeholder.com/970x300.png' */}
            <CoverPhoto src={coverPhoto || '/gh-rides-cover-photo.png'}/>
            {!isPublic && <CoverPhotoButtons>
              {isEditable
                ? (
                  <React.Fragment>
                    <CancelProfile onClick={actions.cancelEditProfile}>Cancel</CancelProfile>
                    <SaveProfile onClick={() => actions.updateUserProfile({aboutText}, userId)}>Save Profile</SaveProfile>
                  </React.Fragment>
                )
                : (
                  <SaveProfile onClick={() => actions.toggleEditProfile()}>Edit Profile</SaveProfile>
                )}
            </CoverPhotoButtons>}
          {isPublic && (
            <div>

            </div>
          )}
          </CoverPhotoWrapper>
        </div>
        <TitleHeader>
          <ProfileImageWrapper>
            <ResponsiveWrapper>
              <ProfileImage src={picture || 'gh-rides-cover-photo.png'} />
            </ResponsiveWrapper>
          </ProfileImageWrapper>
          <UserNameSection>
            <Name>
              {firstName}
            </Name>
            <ProfileRating disabled defaultValue={3} />
          </UserNameSection>
          {this.renderShareButtons()}
        </TitleHeader>
      </React.Fragment>
    )
  }

  renderMainContent() {
    const {actions, userId, account: {aboutText, firstName, createdAt}, isEditable} = this.props;
    const {isPublic} = this.state;

    return (
      <MainContentContent>
        <LeftProfile>
          {!isPublic && <UploadButtons>
            <FileUploader onChange={(formData) => actions.saveProfilePicture(formData, userId)}>
              <ProfileButton>Change<br/>Profile Picture</ProfileButton>
            </FileUploader>
            <FileUploader onChange={(file) => actions.saveCoverPhoto(file, userId)}>
              <ProfileButton>Change<br/>Cover Photo</ProfileButton>
            </FileUploader>
          </UploadButtons>}
          {isPublic && (
            <div>
              {firstName} Joined {moment(createdAt).format(DATE_SHORT_FORMAT)}
            </div>
          )}
        </LeftProfile>
        <RightProfile>
          <AboutMeWrapper>
            {((!isPublic && isEditable) || (!isPublic && aboutText)) && <b>About Me</b>}
            {(aboutText && isPublic) && <b>About {firstName}</b>}
            {isEditable
            ? (
              <AboutMeEdit onChange={(e) => actions.setAboutText(e.target.value)} value={aboutText} placeholder={'Enter info about you or your business'}/>
            )
            : (
              <React.Fragment>
                <AboutMeReadOnly>{aboutText}</AboutMeReadOnly>
              </React.Fragment>
            )}
          </AboutMeWrapper>
        </RightProfile>
      </MainContentContent>
    )
  }

  renderShareButtons = () => {
    const {account: {firstName}} = this.props;

    const shareButtonProps = {
      url: window.location.href,
      style: {cursor: 'pointer'},
      title: `Checkout ${firstName}'s vehicle's at GH RIDES #GHrides`,
      separator: ':: '
    };

    const iconProps = {
      size: '32px',
      round: true
    };

    return (
      <ShareButtons>
        <WhatsappShareButton {...{...shareButtonProps}}>
          <WhatsappIcon {...{...iconProps}}/>
        </WhatsappShareButton>
        <FacebookShareButton {...{...shareButtonProps}}>
          <FacebookIcon {...{...iconProps}}/>
        </FacebookShareButton>
        <TwitterShareButton {...{...shareButtonProps}}>
          <TwitterIcon {...{...iconProps}}/>
        </TwitterShareButton>
        <EmailShareButton {...{...shareButtonProps}}>
          <EmailIcon {...{...iconProps}}/>
        </EmailShareButton>
      </ShareButtons>
    );
  }

  renderHtmlHeadTags = () => {
    const {account: {firstName}, coverPhoto} = this.props;
    const title = `${firstName} GH Rides`;
    const siteUrl = 'http://ghanarides.com';
    const type = 'article';
    const description = 'Ghana Rides provides is a peer-to-peer car sharing platform that connects travellers with vehicle renters';
    const image = coverPhoto || 'http://ghanarides.com/images/gh-rides-cover-photo.png';
    const twitterAt = '@ghanarides';

    return (
    <Helmet>
      <meta property='og:url' content={siteUrl} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* <meta property='og:image' property='og:image:secure_url' itemprop='image' content={image}/> */}
      <meta property='og:image' itemprop='image' content={image}/>
      <meta name='twitter:card' content={description} />
      <meta name='twitter:site' content={twitterAt}/>
      <meta name='twitter:creator' content={twitterAt} />
    </Helmet>
    )
  }

  render() {
    const {account: {id: accountId, accountListings: listings} = {}} = this.props;
    const {isPublic} = this.state;

    if (!accountId) {
      return <div></div>
    }
    return (
      <ProfilePage>
        {this.renderHtmlHeadTags()}
        <HeaderContent>
          {this.renderHeaderContent()}
        </HeaderContent>
        <MainContent>
          <MainContentHeader>
            {!isPublic && <ProfileButton onClick={() => {}}>Preview Profile</ProfileButton>}
          </MainContentHeader>
          {this.renderMainContent()}
          <div style={{height: '1px', borderTop: '1px solid #ccc', margin: '1em 0'}}></div>
          {<Vehicles {...{...this.props, listings}}></Vehicles>}
        </MainContent>  
      </ProfilePage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isEditable: state.profile.isEditable,
    account: state.profile.account,
    accountid: state.metaData.accountId,
    userId: state.metaData.user.id
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Profile));