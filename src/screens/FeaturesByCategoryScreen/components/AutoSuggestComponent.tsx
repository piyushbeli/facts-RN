import * as React from 'react';

// UI
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Component
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, withNavigation } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, Icon } from 'react-native-elements';
import { colors, typos } from '@styles';
import { TextInput } from 'react-native-gesture-handler';
import { CONSTANTS, capitalize } from '@utils';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
  disabled?: boolean;
  onBrandSelect?: any;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;;

// state
interface IState {
  data: string[],
  query: string,
  hideResults: boolean,
  timeoutInProgress: boolean,
  noResults: boolean
}

const mapStateToProps = function(state: any) {
  return {
    brands: state.advertisement.brands,
  }
};

class AutoSuggestComponent extends React.Component<IProps, IState> {
  _fetchBrandsHandler: any;
  _callOnBlur: any = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      query: '',
      timeoutInProgress: false,
      hideResults: false,
      noResults: false
    }
  }

  onChangeText = async (value: any) => {
    this.setState({
      noResults: false,
      query: value,
      hideResults: value.length < 2,
    });
    this._callOnBlur = true;
    if (value.length >= 2) {
      if (this._fetchBrandsHandler) {
        clearTimeout(this._fetchBrandsHandler);
      }
      this._fetchBrandsHandler = setTimeout(() => {
        this.fetchBrands();
      }, 300);
    }
  }

  fetchBrands = async () => {
    this._fetchBrandsHandler = null;
    await this.props.fetchBrands(this.state.query);
    this.setState({
      hideResults: false,
      data: this.props.brands ? this.props.brands : []
    });
  }

  onItemSelect = (value: string) => {
    this._callOnBlur = false;
    this.setState({
      query: value.trim(),
      hideResults: true
    }, () => {
      if (this.props.onBrandSelect) {
        this.props.onBrandSelect(this.state.query);
      }
    });
  }

  getListItem = (item: any) => {
     let index = item.brand.toLowerCase().indexOf(this.state.query.toLowerCase());
     item.brand =  capitalize(item.brand);
     return <Text style={styles.listItem}>
        {item.brand.substring(0, index)}
        <Text style={{...typos.PRIMARY}}>{item.brand.substring(index, index + this.state.query.length)}</Text>
        {item.brand.substring(index + this.state.query.length)} (<Text style={{...typos.PRIMARY}}>{item.total}</Text>)</Text>
  }

  onBlur = () => {
      if (this._callOnBlur) {
        this.setState({
          hideResults: true,
          noResults: true
        });
        this.props.onBrandSelect(this.state.query);
      }
  }

  public render() {
    const textInputColor: any = {};
    if (this.state.noResults) {
      textInputColor.color = colors.ERROR;
    } else {
      textInputColor.color = colors.TEXT_PRIMARY;
    }

    return (
      <View style={styles.searchbar}>
        <Autocomplete
          data={this.state.data}
          renderTextInput={() => (
            <View style={styles.inputWrapper}>
              <Icon
                name='search'
                type='feather'
                size={12}
                color={this.state.noResults ? colors.ERROR : this.state.query ? colors.PRIMARY : colors.BLACK}
                containerStyle={styles.searchIconContainer} />
              { this.props.disabled ? <Text style={[styles.text]}>search specials by brand</Text>
                : <TextInput autoFocus={true} style={[styles.textInput, textInputColor]} value={this.state.query} onBlur={this.onBlur}
                onChangeText={this.onChangeText} editable={!this.props.disabled} placeholder='search specials by brand'/> }
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.onItemSelect(item.brand)}>
              { this.getListItem(item) }
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => (_ + index)}
          inputContainerStyle={styles.inputContainerStyle}
          listContainerStyle={styles.listContainerStyle}
          listStyle={styles.listStyle}
          hideResults={this.state.hideResults}
          flatListProps={{
            showsVerticalScrollIndicator: false
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 10,
  },
  inputWrapper: {
    borderRadius: 10,
    backgroundColor: colors.WHITE
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.LIGHT_GRAY
  },
  listContainerStyle: {
    elevation: 5,
    zIndex: 5,
    shadowOpacity: 0.4,
    shadowOffset: {
        width: 3,
        height: 10
    },
    shadowColor: colors.MID_GRAY,
    shadowRadius: 10,
  },
  listStyle: {
    margin: 0,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    borderRadius: 10,
  },
  listItem: {
    ...typos.PRIMARY_LIGHT,
    fontWeight: 'normal',
    padding: 10,
  },
  divider: {
    backgroundColor: colors.LIGHT_GRAY,
    height: 1,
  },
  textInput: {
    ...typos.PRIMARY_MEDIUM,
    borderRadius: 5,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 30,
    textTransform: 'capitalize'
  },
  text: {
    ...typos.PRIMARY_MEDIUM,
    color: colors.TEXT_SECONDARY,
    borderRadius: 5,
    height: 30,
    paddingVertical: 7,
    paddingHorizontal: 5,
    paddingLeft: 30,
    opacity: 0.6
  },
  searchIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  }
});

const AutoSuggestComponentWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(AutoSuggestComponent));
export { AutoSuggestComponentWrapper as AutoSuggestComponent }
