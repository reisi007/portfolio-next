import Link from 'next/link';
import classNames from 'classnames';
import { Review, ReviewProps } from '../static/loadReviews';
import { Breakpoint, Image, ImageSizes } from '../utils/Image';
import { DaysAgo } from '../utils/Age';
import { ReisishotIcon, ReisishotIcons } from '../utils/ReisishotIcons';
import { Styleable } from '../types/Styleable';

const PREVIEW_IMAGE_SIZES: ImageSizes = {
  [Breakpoint.default]: 1,
  [Breakpoint.sm]: 1,
  [Breakpoint.md]: 1,
  [Breakpoint.lg]: 2,
  [Breakpoint.xl]: 3,
  [Breakpoint['2xl']]: 4,
};
export function DisplayReviews({
  reviews,
  start = 0,
  limit = Number.MAX_VALUE,
}: { reviews: Array<Review>, start?: number, limit?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {
        reviews.slice(start, Math.min(start + limit, reviews.length))
          .map((r) => <PreviewReview key={r.id} review={r} imageSizes={PREVIEW_IMAGE_SIZES} />)
      }
    </div>
  );
}

export function PreviewReview({
  review,
  imageSizes,
}: { review: Review, imageSizes?: ImageSizes }) {
  const {
    id,
    frontmatter,
  } = review;

  return (
    <Link
      className={classNames(
        'black w-full',
        { 'border border-black': frontmatter.image === undefined },
      )}
      href={`reviews/${id}`}
    >
      <PreviewReviewContent
        {...frontmatter}
        className="h-8"
        imageSizes={imageSizes}
      />
    </Link>
  );
}

export function PreviewReviewContent({
  name,
  date,
  rating,
  image,
  imageSizes,
  style,
  className,
}: ReviewProps & Partial<Styleable> & { imageSizes?: ImageSizes }) {
  const classes = 'absolute bg-black/30 text-white py-2 px-4 m-0 backdrop-blur';
  return (
    <div style={style} className="relative h-full min-h-[5rem]">
      {image !== undefined && <Image className={className} imageSizes={imageSizes} filename={image} />}
      <span className={classNames(classes, 'top-0 rounded-br')}>
        {name}
      </span>
      <span className={classNames(classes, 'bottom-0 left-0 rounded-tr')}>
        <DaysAgo dateString={date} />
      </span>
      {rating !== undefined && rating > 0 && (
        <span className={classNames(classes, 'top-0 right-0 rounded-bl')}>
          {rating / 20}
          {' '}
          <ReisishotIcon className="text-gold" icon={ReisishotIcons.Star_full} />
        </span>
      )}
    </div>
  );
}