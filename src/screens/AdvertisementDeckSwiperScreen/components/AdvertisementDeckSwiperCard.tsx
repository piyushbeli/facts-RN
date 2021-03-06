import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import { IAdvertisement } from '@interfaces/advertisement';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { ImageView } from '@components';
import { formatObject } from '@utils';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  onDataChange: Function,
}
type IProps = IOwnProps;

interface IState {
  advertisement: any,
}
class AdvertisementDeckSwiperCard extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      advertisement: formatObject(this.props.advertisement || {}),
    };
  }

  onChangeField = (field: string, text: any) => {
    const advertisement = this.state.advertisement;
    advertisement[field] = text;
    this.setState({
      advertisement: advertisement
    });
    this.props.onDataChange(this.state.advertisement);
  }

  public render() {
    const { image, category, brand, type, units, capacity, size, rprice, sprice } = this.state.advertisement;
    const height = Dimensions.get('window').height - 125; 

    return (
      <SafeAreaView>
        <Card containerStyle={[styles.container, {maxHeight: height}]}>
          <Card containerStyle={[styles.container, styles.imageContainer]}>
            <ImageView image={this.props.advertisement.image} height={200} allowFullMode={true}/>
          </Card>
          <Text style={styles.label}>Brand</Text>
          <TextInput style={[styles.text]} value={`${brand}`} onChangeText={(text) => this.onChangeField('brand', text)}/>

          <Text style={styles.label}>Classification</Text>
          <TextInput style={[styles.text]} value={`${category}`} onChangeText={(text) => this.onChangeField('category', text)}/>

          <Text style={styles.label}>Type</Text>
          <TextInput style={[styles.text]} value={`${type}`} onChangeText={(text) => this.onChangeField('type', text)}/>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>Units</Text>
              <TextInput style={[styles.text]} value={`${units}`} onChangeText={(text) => this.onChangeField('units', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Capacity</Text>
              <TextInput style={[styles.text]} value={`${capacity}`} onChangeText={(text) => this.onChangeField('capacity', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Size</Text>
              <TextInput style={[styles.text]} value={`${size}`} onChangeText={(text) => this.onChangeField('size', text)}
                keyboardType="numeric"/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>Regular Price</Text>
              <TextInput style={[styles.text]} value={`${rprice}`} onChangeText={(text) => this.onChangeField('rprice', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Special Price</Text>
              <TextInput style={[styles.text]} value={`${sprice}`} onChangeText={(text) => this.onChangeField('sprice', text)}
                keyboardType="numeric"/>
            </View>
          </View>
        </Card>
      </SafeAreaView>
    );
  }
}

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
  },
  imageContainer: {
    padding: 0,
    margin: 0,
    maxHeight: 250,
  },
  padding: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 250,
    borderRadius: 10,
  },
  text: {
    ...typos.PRIMARY,
    borderRadius: 2,
    borderColor: colors.LIGHT_GRAY,
    height: 30,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  label: {
    ...typos.PRIMARY,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2
  },
  row: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1,
  },
  empty: {
    width: 20,
    height: 20,
  }
});

export { AdvertisementDeckSwiperCard };
