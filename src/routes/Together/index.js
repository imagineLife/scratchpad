import React from 'react'
import './index.css'

const FlexGrid = () => {
	return(
		<main id="flex-grid-layout">
			
			<header>
				<div id="title-box" className="f-w">
					<div className="title-text-wrapper">
						<h1 className="title">SayWhat?!</h1>
						<div className="corner-box">
							<p>A Play on Newspapers, Text-Analysis, & Interaction</p>
						</div>
					</div>
					<div className="title-data">
						<span className="sub-title border-right">Donald Trump</span>
						<span className="sub-title border-right">On the 20th Day of February in the Year of 2017</span>
						<span className="sub-title">Gives his 1473-word address to the nation</span>
					</div>
				</div>
				
				<div id="area-box">
					<p>Area Box</p>
				</div>
			</header>
			
			<section id="left-side">
				<div id="focus-area-box">
					<h2 className="section-text">A Glance At The Text</h2>
					<div id="focus-area-hover">
					</div>
					<p className="explanatory-text">Hover over this area chart to highlight the sentence 
					that was spoken at the specific point in time during the 
					president’s address.  HOVER</p>
				</div>

				<div id="words-of-interest-box">
					<h2 className="section-text">Words Of Interest</h2>
					<p className="explanatory-text">Here are some various types of words that were spoken. 
					The word lists are toggle-able & the words are selectable. SELECT.SELECT</p>
					<p>Words-Of-Interest Box</p>
				</div>
			</section>
			
			<section id="right-side">
				<div id="area-explain-box">
					<p className="explanatory-text">In the above area chart, the dotted-box can be used to select a specific 
						range of the speech, & update the remainder of the document 
						(move, shrink, widen) CLICK.DRAG.MOVE</p>
				</div>
				
				<div id="theme-box">
					<h2 className="section-text">Textual Themes</h2>
					<p className="explanatory-text">Colors match text to a 'theme'. CLICK</p>
					<p>Theme Box</p>
				</div>
				
				<div id="image-box">
					<p>Image Box</p>
					<h2 className="section-text image-sub">The President <br /> Addresses The Nation</h2>
				</div>
				
				<div id="words-by-length-box">
					<h2 className="section-text">Words By Length</h2>
					<p>Words-By-Length Box</p>
				</div>
			</section>
			
			<footer>
				<div id="divider-box">
					<p>The text content of the speech, below, is responsive to interactions above.</p>
				</div>
				
				<div id="text-display-box">
					<p className="text-content">Chief Justice Roberts, President Carter, President Clinton, President Bush, President Obama, fellow Americans, and people of the world, thank you. we the citizens of America are now joined in a great national effort to rebuild our country and restore its promise for all of our people. together we will determine the course of America, and the world, for many, many years to come. We will face challenges. We will confront hardships, but we will get the job done. Every four years, we gather on these steps to carry out the orderly and peaceful transfer of power, and we are grateful to President Obama and First Lady Michelle Obama for their gracious aid throughout this transition. They have been magnificent. Thank you. Today's ceremony, however, has very special meaning, because today we are not merely transferring power from one administration to another, or from one party to another, but we are transferring power from Washington, D.C and giving it back to you, the people. For too long, a small group in our nation's capital has reaped the rewards of government, while the people have borne the cost. Washington flourished, but the people did not share in its wealth. Politicians prospered, but the jobs left and the factories closed. The establishment protected itself, but not the citizens of our country. Their victories have not been your victories. Their triumphs have not been your triumphs, and while they celebrated in our nation's capital, there was little to celebrate for struggling families all across our land. That all changes, starting right here and right now, because this moment is your moment --- it belongs to you. It belongs to everyone gathered here today, and everyone watching, all across America. This is your day. This is your celebration, and this, the United States of America, is your country. What truly matters is not which party controls our government, but whether our government is controlled by the people. January 20th, 2017 will be remembered as the day the people became the rulers of this nation again. The forgotten men and women of our country, will be forgotten no longer. Everyone is listening to you now. You came by the tens of millions to become part of a historic movement, the likes of which the world has never seen before. At the center of this movement is a crucial conviction, that a nation exists to serve its citizens. Americans want great schools for their children, safe neighborhoods for their families, and good jobs for themselves. These are just and reasonable demands of righteous people and a righteous public, but for too many of our citizens a different reality exists. Mothers and children trapped in poverty in our inner cities, rusted out factories, scattered like tombstones across the across the landscape of our nation, an education system flush with cash, but which leaves our young and beautiful students deprived of all knowledge, and the crime, and the gangs, and the drugs that have stolen too many lives and robbed our country of so much unrealized potential. This American carnage stops right here and stops right now. We are one nation and their pain is our pain. Their dreams are our dreams and their success will be our success. We share one heart, one home, and one glorious destiny. The oath of office, I take today, is an oath of allegiance to all Americans. For many decades, we've enriched foreign industry at the expense of American industry, subsidized the armies of other countries, while allowing for the very sad depletion of our military. We've defended other nation's borders while refusing to defend our own. And spent trillions and trillions of dollars overseas, while America's infrastructure has fallen into disrepair and decay. We've made other countries rich while the wealth, strength and confidence of our country has dissipated over the horizon. One by one, the factories shuddered and left our shores, with not even a thought about the millions and millions of American workers that were left behind. The wealth of our middle class has been ripped from their homes and then redistributed all across the world. But that is the past, and now we are looking only to the future. We assembled here today our issuing a new decree to be heard in every city, in every foreign capital, and in every hall of power, from this day forward: a new vision will govern our land, from this day forward, it's going to be only America first. America first. Every decision on trade, on taxes, on immigration, on foreign affairs will be made to benefit American workers and American families. We must protect our borders from the ravages of other countries making our products, stealing our companies and destroying our jobs. Protection will lead to great prosperity and strength. I will fight for you with every breath in my body, and I will never, ever let you down. America will start winning again, winning like never before. We will bring back our jobs. We will bring back our borders. We will bring back our wealth, and we will bring back our dreams. We will build new roads and highways and bridges and airports and tunnels, and railways, all across our wonderful nation. We will get our people off of welfare and back to work, rebuilding our country with American hands and American labor. We will follow two simple rules: buy American, and hire American.</p>
				</div>
			</footer>
			
		</main>
	)
}
export default FlexGrid