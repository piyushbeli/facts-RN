import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { IOutlet } from '@interfaces/outlet';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  onItemPress?: Function,
  outlet: IOutlet.IOutletData;
}
type IProps = IOwnProps;

interface IState {
  featureImage: any,
}
class AdvertisementGridItem extends React.Component<IProps, IState> {
 
  constructor(props: IProps) {
      super(props);
      this.state = {
          featureImage: require('@assets/images/placeholder.png')
      };
  }
  
  componentDidMount() {
    if (this.props.advertisement.image) {
        Image.getSize(this.props.advertisement.image, (width: number, height: number) => {
            this.setState({ 
                featureImage: this.props.advertisement.image
            });
        }, err => {});
    }
  }

  onItemPress = () => {
    if (this.props.onItemPress) 
      this.props.onItemPress(this.props.advertisement);
  }

  public render() {
    const { advertisement, outlet } = this.props;
    const {id, type, brand, sprice, rprice, sizeMeasure } = advertisement;
    const itemWidth = (Dimensions.get('window').width >> 1) - 35; 
    return (
      <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
        <Card containerStyle={[styles.container, {width: itemWidth}]}>
          <Card containerStyle={[styles.imageContainer]}>
            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
              <Image style={[styles.image, { height: 80 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
          </Card>
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={[styles.boldText, styles.padding, styles.flex]}>{brand}</Text>
              <Text style={[styles.boldText, styles.padding]}>${sprice}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.pieces, styles.padding, styles.flex]}>{sizeMeasure}</Text>
              <Text style={[styles.originalPrice, styles.padding]}>${rprice}</Text>  
            </View>
            <Text style={[styles.type, styles.padding]}>{type}</Text>
            <Text style={[styles.type, styles.padding]}>{outlet.outlet}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowOffset: {
        width: 0,
        height: 5
    },
    shadowColor: colors.LIGHT_BLUE,
    elevation: 3,
    shadowRadius: 10,
    padding: 0, 
  },
  imageContainer: {
    borderRadius: 0,
    padding: 15,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10,
    shadowOpacity: 0,
    elevation: 0,
  },
  padding: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
  },
  boldText: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY
  },
  type: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY,
  },
  pieces: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY
  },
  priceContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  price: {
    ...typos.PRIMARY_BOLD,
    color: colors.TEXT_SECONDARY  
  },
  originalPrice: {
    ...typos.SMALL,
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    flex: 1
  },
  details: {
    backgroundColor: colors.LIGHT_GRAY, 
    paddingVertical: 15, 
    paddingHorizontal: 10,
    borderBottomRightRadius: 10, 
    borderBottomLeftRadius: 10
  }
});

export { AdvertisementGridItem };
